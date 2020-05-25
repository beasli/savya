import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { PRODUCTFILTERMENU } from 'src/config';

@Component({
  selector: 'app-filter-nav-bar',
  templateUrl: './filter-nav-bar.component.html',
  styleUrls: ['./filter-nav-bar.component.css']
})

export class FilterNavBarComponent implements OnInit {
  jewelery_for:any;
  material:any;
  purity:any;
  price:any;
  jewelery_type:any;
  filter:any;
  constructor(private api:ApiService) { 
    this.filter=this.api.getfilter();
    }
  deleteSelected(type,filterValue)
    {
      let f= this.api.getfilter();
        console.log(type);
        console.log(filterValue);
        //console.log(Object.keys(this.filter.menu.price).length);
        if(type=="jewelery_type")
        {
          // console.log("if condition");
          f.menu.jewelery_type=[];
          this.api.setfilter(f);     
        }
        else if(type=="jewelery_for")
        {
            if(f.menu.jewelery_for.length>0)
            {
                let result=f.menu.jewelery_for.find(x => x == filterValue);
                if(result)
                {
                  let i= f.menu.jewelery_for.indexOf(result);
                  if (i > -1) {
                    f.menu.jewelery_for.splice(i, 1);
                  }
                  this.api.setfilter(f);
                }
            }
        }
        else if(type=="material")
        {
          if(f.menu.material.length>0)
          {
                let result=f.menu.material.find(x => x == filterValue);
                if(result)
                {
                  let i= f.menu.material.indexOf(result);
                  if (i > -1) {
                    f.menu.material.splice(i, 1);
                  }
                  this.api.setfilter(f);
                }
            }
        }
        else if(type=="purity")
        {
          if(f.menu.purity.length>0)
            {
              let result=f.menu.purity.find(x => x == filterValue);
              if(result)
              {
                let i= f.menu.purity.indexOf(result);
                if (i > -1) {
                  f.menu.purity.splice(i, 1);
                }
                 this.api.setfilter(f);
              }
            }  
        }
        else if(type=="price")
        {
          Object.keys(f.menu.price).forEach(k => delete f.menu.price[k]);
          this.api.setfilter(f);
        }
    }
    checkClear()
    {
      let f= this.api.getfilter();
      if(f.menu.jewelery_type.length>0||f.menu.jewelery_for>0||f.menu.material.length>0||f.menu.purity.length>0||Object.keys(f.menu.price).length>0)
      {
        return true;
      }
      else{
        return false;
      }
    }
    checkP()
    {
      let f= this.api.getfilter();
      if(Object.keys(f.menu.price).length>0)
      {
        return true;
      }
      else{
        return false;
      }
    }
changefilter(event,value)
{
  let name=event.target.name;
  console.log(name);
  let f= this.api.getfilter();
  console.log(event);
  console.log(value);
  if(name=="jewelery_for")
  {
            console.log("if condition");
            console.log(f.menu.jewelery_for);
            if(f.menu.jewelery_for.length>0)
            {
              let result=f.menu.jewelery_for.find(x => x == value);
              if(result)
              {
                let i= f.menu.jewelery_for.indexOf(result);
                if (i > -1) {
                  f.menu.jewelery_for.splice(i, 1);
                }
                this.api.setfilter(f);
              }
              else
              {
                f.menu.jewelery_for.push(value);
                this.api.setfilter(f);
              }
          }
          else
          {
            f.menu.jewelery_for.push(value);
            this.api.setfilter(f);
          }
  }
  else if(name=="jewelery_type")
  { 
    f.menu.jewelery_type=[]
    f.menu.jewelery_type.push(value);
    this.api.setfilter(f);     
  }
  else if(name=="purity")
  {
            console.log("if condition");
            console.log(f.menu.purity);
            if(f.menu.purity.length>0)
            {
              let result=f.menu.purity.find(x => x == value);
              if(result)
              {
                let i= f.menu.purity.indexOf(result);
                if (i > -1) {
                  f.menu.purity.splice(i, 1);
                }
                 this.api.setfilter(f);
              }
              else
              {
                f.menu.purity.push(value);
                this.api.setfilter(f);
              }
          }
          else
          {
            f.menu.purity.push(value);
            this.api.setfilter(f);
          }
  }
 
  else if(name=="material")
  {
            console.log("if condition");
            console.log(f.menu.material);
            if(f.menu.material.length>0)
            {
                  let result=f.menu.material.find(x => x == value);
                  if(result)
                  {
                    let i= f.menu.material.indexOf(result);
                    if (i > -1) {
                      f.menu.material.splice(i, 1);
                    }
                    this.api.setfilter(f);
                  }
                  else
                  {
                    f.menu.material.push(value);
                    this.api.setfilter(f);
                  }
          }
          else
          {
            f.menu.material.push(value);
            this.api.setfilter(f);
          }
  }

}
getprice(event){
  console.log(event);
  let min;
  let max;
  let res:any;
  let a=event['target']['value'];
  let f= this.api.getfilter();
    if(a.length<=5)
    {
       min=a;
       max=1000000;
       f.menu.price.min=Number(min);
       f.menu.price.max=Number(max);
       this.api.setfilter(f);
    }
    else
    {
       res = a.split("-");
        min =res[0];
        max  =res[1]
        f.menu.price.min=Number(min);
        f.menu.price.max=Number(max);
        this.api.setfilter(f);
    }
}
clear()
{
  let initial={"menu":{"jewelery_for":[],"jewelery_type":[],"material":[],"price":{},"purity":[]}};
  this.api.setfilter(initial);
}

checkedprice(min)
{
    
      let f= this.api.getfilter();
       
                if(f.menu.price.min==min)
                {
                  return true;
                }
                else
                {
                    return false;
                }
      
        
       

}
checkedjewelery_type(value)
{
    let f= this.api.getfilter();
    if(f.menu.jewelery_type==value)
    {
      return true;
    }
    else
    {
      return false;
    }
}
checkedjewelery_for(value)
{
  let f= this.api.getfilter();
  let result=f.menu.jewelery_for.find(x => x == value);
  if(result)
  {
   return true;
  }
  else
  {
    return false;
  }

}
checkedmaterial(value)
{
  let f= this.api.getfilter();
  let result=f.menu.material.find(x => x == value);
  if(result)
  {
   return true;
  }
  else
  {
    return false;
  }
}
checkedpurity(value)
{
  let f= this.api.getfilter();
  let result=f.menu.purity.find(x => x == value);
  if(result)
  {
   return true;
  }
  else
  {
    return false;
  }
}
  ngOnInit(){
    this.api.Get(PRODUCTFILTERMENU).then(data  => {
      this.jewelery_for=data['menu'].jewelery_for;
      console.log(data);
       this.material=data['menu'].material;
       this.purity=data['menu'].purity;
       this.price=data['menu'].price;
       this.jewelery_type=data['menu'].jewelery_type;
       console.log(this.jewelery_type);
      }).catch(d=>{
       console.log(d);
     });
     this.api.filterChange.subscribe(data=>{
       this.filter=this.api.getfilter();
       console.log(this.filter);
     })
  }
  
}
