import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

     

<VerticalCardProduct category={"garden-sheds"} heading={"Garden Sheds"} />
<VerticalCardProduct category={"workshop-sheds"} heading={"Workshop Sheds"} />
<VerticalCardProduct category={"garage-sheds"} heading={"Garage Sheds"} />
<VerticalCardProduct category={"storage-units"} heading={"Storage Units"} />
<VerticalCardProduct category={"aviaries-pet-shelters"} heading={"Aviaries & Pet Shelters"} />
<VerticalCardProduct category={"roofing-sheets"} heading={"Roofing Sheets"} />
<VerticalCardProduct category={"mcfoil-insulation"} heading={"Foil Insulation (MCFOIL)"} />
<VerticalCardProduct category={"custom-sheds"} heading={"Custom Shed Builder"} />

    </div>
  )
}

export default Home