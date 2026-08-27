import Banner from "@/components/homepage/Banner";
import CategorySection from "@/components/homepage/CategorySection";
import FeaturedSection from "@/components/homepage/FeaturedSection";
import NewsletterSection from "@/components/homepage/NewsLetterSection";
import PromoBanner from "@/components/homepage/PromoBanner";
import ValueFeatures from "@/components/homepage/ValueFeatures";


const  Home = ()=> {
  return (
    <div>
      <Banner/>
      <FeaturedSection/>
      <CategorySection/>
      <PromoBanner/>
      <ValueFeatures/>
      <NewsletterSection/>
    </div>
  );
}
export default Home
