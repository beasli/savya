import {Injectable} from '@angular/core'; 
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {
  constructor(private title: Title, private meta: Meta) { }


  updateTitle(title: string = "Savya Jewels Business India's 1st B2B Application For Jewellery Industry.") {
    this.title.setTitle(title);
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url });
  }

  updateDescription(desc: string = "Savya Jewels Business India's 1st B2B for Jewelry Industry Only. Explore it now and find out the various opportunities to Grow and Expand your business at Pan India level.") {
    this.meta.updateTag({ name: 'description', content: desc });
  }
  updateKeywords(desc: string = "Jewellery Application, B2B Jewelry, Jewelry Business, Business Plan, Grow Together, Jewelry Business Application, Jewelry Business Online") {
    console.log(desc);
    this.meta.updateTag({ name: 'keywords', content: desc });
  }

}
