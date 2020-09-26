import {Inject, Injectable, RendererFactory2,ViewEncapsulation} from '@angular/core'; 
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
@Injectable()
export class SeoService {
  constructor(private title: Title, private meta: Meta,@Inject(DOCUMENT) private doc,private rendererFactory: RendererFactory2,) { }


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
  createLinkForCanonicalURL() {
    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', this.doc.URL);
  }



  removeCanonicalLink() {
    try {
        const renderer = this.rendererFactory.createRenderer(this.doc, {
            id: '-1',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
        });
        const canonical = document.querySelector("link[rel='canonical']")
        const head = this.doc.head;

        if (head === null) {
            throw new Error('<head> not found within DOCUMENT.');
        }
        if (!!canonical) {
            renderer.removeChild(head, canonical);
        }
    } catch (e) {
        console.error('Error within linkService : ', e);
    }
}

}
