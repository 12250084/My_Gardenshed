const productModel = require("../../models/productModel");
const thermofoilProductModel = require("../../models/thermofoil");

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

        // Fetch all products from both collections
        const allProducts = await productModel.find();
        const thermofoilProducts = await thermofoilProductModel.find();

        // Format product data for the AI
        let productList = allProducts.map(p => ({
            id: p._id,
            name: p.productName || p.name,
            type: 'product',
            category: p.category,
            brand: p.brandName || p.brand,
            price: p.sellingPrice || p.pricePerUnit,
            description: p.description,
            url: `/product/${p._id}` // Add product URL
        }));

        // Add thermofoil products to the product list
        const thermofoilList = thermofoilProducts.map(p => ({
            id: p._id,
            name: p.name || p.productName,
            type: 'thermofoil',
            category: p.category,
            brand: p.brand,
            price: p.pricePerUnit || p.sellingPrice,
            description: p.description,
            url: `/thermofoil/${p._id}` // Add thermofoil URL
        }));

        productList = [...productList, ...thermofoilList];

        // Create the AI prompt
        const prompt = `
You are a shopping assistant for a home improvement store. 
The user is asking: "${message}"

Here are our current products in JSON format:
${JSON.stringify(productList)}

Your task is to:
1. Understand the user's request
2. Recommend relevant products from our inventory
3. For each recommendation, include:
   - Product name
   - Brief description (1 sentence)
   - Price
   - Direct link to the product (use the 'url' field)
4. If no products match, suggest alternatives or ask clarifying questions
5. Keep responses concise (3-5 recommendations max)
6. Format product recommendations as:
   "• [Product Name] - [Price] - [Brief Description] [Product Link]"
7. For thermofoil products, mention they are thermofoil products
8. Give links in this format "Here's a product: [RR980 Thermofoil Cabinet Door](/thermofoil/123)"
9. Maintain a friendly and helpful tone
        `;

        // Call OpenAI API directly
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: prompt
                }],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to get AI response');
        }

        res.json({
            success: true,
            response: data.choices[0].message.content.trim()
        });

    } catch (error) {
        console.error("Error in chatWithAI:", error);
        res.status(500).json({
            success: false,
            message: "I'm having trouble accessing our product information. Please try again later or contact our support team."
        });
    }
}

module.exports = chatWithAI;