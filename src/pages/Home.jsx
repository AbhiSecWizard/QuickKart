import Carousal from '../component/Carousal'
import MidBanner from '../component/MidBanner'
import {Features} from '../component/Features'


const Home = () => {
  return (
    <div className="">
        <Carousal />  
        <MidBanner/>
        <Features/>
    </div>
  )
}

export default Home
