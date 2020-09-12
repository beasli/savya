import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { MACHINESEARCH } from 'src/config';

@Component({
  selector: 'app-machinery-search',
  templateUrl: './machinery-search.component.html',
  styleUrls: ['./machinery-search.component.css']
})
export class MachinerySearchComponent implements OnInit {
  loader: boolean;
  page: boolean;
  alert: boolean;
  products: any;
  div: boolean;
  data: any;
  url: string;

  constructor(private api:ApiService,private route:ActivatedRoute,private router:Router) { 
    this.route.params.subscribe(params => {
      console.log(params.value);
      this.data=params.value;
      this.searchApi();
      });
  }
  go(argument){
    this.router.navigate(['/products/machinery', argument]);
  }

  searchApi()
{
  this.loader=true;
    this.page=false;
  this.api.Post(MACHINESEARCH,{'search':this.data}).then(data=>{
    this.page=true;
      this.loader=false;
    this.alert=false;
    this.div=true;
    console.log(data);
    this.products = data['data'];
    console.log(this.products);
    this.url = data['url'] + '/';
  }).catch(d=>{
    this.page=true;
      this.loader=false;
    this.alert=true;
    this.div=false;
    console.log(d);
  })
}

  ngOnInit(): void {
  }

}
