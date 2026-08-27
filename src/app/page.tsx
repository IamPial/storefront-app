import Banner from "@/components/homepage/Banner";
import CategorySection from "@/components/homepage/CategorySection";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import PromoBanner from "@/components/homepage/PromoBanner";


const  Home = ()=> {
  return (
    <div>
      <Banner/>
      <FeaturedSection/>
      <CategorySection/>
      <PromoBanner/>
    </div>
  );
}
export default Home
