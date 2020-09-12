import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  hide = 0;
  jfor = 0;
  metf = 0;
  prif = 0;
  purf = 0;
  jewt = 0;
  constructor(private api:ApiService,private eRef: ElementRef) { 
    this.filter=this.api.getfilter();
    }
    @ViewChild('pricea', { static: true }) a: ElementRef;
    @ViewChild('type', { static: true }) b: ElementRef;
    @ViewChild('purityz', { static: true }) c: ElementRef;
    @ViewChild('for', { static: true }) d: ElementRef;
    @ViewChild('metal', { static: true }) e: ElementRef;
    

    @HostListener('document:click', ['$event'])
    clickout(event) {
      if(this.eRef.nativeElement.contains(event.target)) {
        
      } else {
        this.a.nativeElement.classList.remove('active');
        this.b.nativeElement.classList.remove('active');
        this.c.nativeElement.classList.remove('active');
        this.d.nativeElement.classList.remove('active');
        this.e.nativeElement.classList.remove('active');
      }
    }

    openclose(value) {
      if(value == 1) {
        if (this.prif==1) {
          this.prif = 0;
        } else {
          this.prif = 1;
          this.jewt = 0;
          this.purf = 0;
          this.jfor = 0;
          this.metf = 0;
        }
      } else if (value == 2) {
        if (this.jewt == 1) {
          this.jewt = 0;
        } else {
          this.jewt = 1;
          this.purf = 0;
          this.prif = 0;
          this.jfor = 0;
          this.metf = 0;
        }

      } else if (value == 3) {
        if (this.purf == 1) {
          this.purf = 0;
        } else {
          this.purf = 1;
          this.prif = 0;
          this.jewt = 0;
          this.jfor = 0;
          this.metf = 0;
        }
      } else if (value == 4) {
        if (this.jfor == 1) {
          this.jfor = 0;
        } else {
          this.jfor = 1;
          this.prif = 0;
          this.jewt = 0;
          this.purf = 0;
          this.metf = 0;
        }
      } else if (value == 5) {
        if (this.metf == 1) {
          this.metf = 0;
        } else {
          this.metf = 1;
          this.prif = 0;
          this.jewt = 0;
          this.purf = 0;
          this.jfor = 0;
        }
      }
    }


  deleteSelected(type,filterValue)
    {
      let f= this.api.getfilter();
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
    ngOnDestroy(){
      this.clear();
    }

    filteropen(value){
      if(value==1){
        this.hide=1;
      } else{
        this.hide=0;
      }
    }


    checkClear()
    {
      
      let f= this.api.getfilter();
      if(f.menu.jewelery_type.length>0||f.menu.jewelery_for.length>0||f.menu.material.length>0||f.menu.purity.length>0||Object.keys(f.menu.price).length>0)
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
  if(name=="jewelery_for")
  {
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
  this.a.nativeElement.classList.remove('active');
  this.b.nativeElement.classList.remove('active');
  this.c.nativeElement.classList.remove('active');
  this.d.nativeElement.classList.remove('active');
  this.e.nativeElement.classList.remove('active');

}

abc(a,name) {
  if(name == 'price' ) {
    this.b.nativeElement.classList.remove('active');
    this.c.nativeElement.classList.remove('active');
    this.d.nativeElement.classList.remove('active');
    this.e.nativeElement.classList.remove('active');

  } else if (name == 'type') {
    this.a.nativeElement.classList.remove('active');
    this.c.nativeElement.classList.remove('active');
    this.d.nativeElement.classList.remove('active');
    this.e.nativeElement.classList.remove('active');
  } else if(name == 'purity') {
    this.a.nativeElement.classList.remove('active');
    this.b.nativeElement.classList.remove('active');
    this.d.nativeElement.classList.remove('active');
    this.e.nativeElement.classList.remove('active');
  } else if(name == 'for') {
    this.a.nativeElement.classList.remove('active');
    this.b.nativeElement.classList.remove('active');
    this.c.nativeElement.classList.remove('active');
    this.e.nativeElement.classList.remove('active');
  } else if (name == 'metal') {
    this.a.nativeElement.classList.remove('active');
    this.b.nativeElement.classList.remove('active');
    this.c.nativeElement.classList.remove('active');
    this.d.nativeElement.classList.remove('active');
  }
  a.classList.toggle("active");
}
getprice(event){
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
    this.a.nativeElement.classList.remove('active');
    this.b.nativeElement.classList.remove('active');
    this.c.nativeElement.classList.remove('active');
    this.d.nativeElement.classList.remove('active');
    this.e.nativeElement.classList.remove('active');
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
      
       this.material=data['menu'].material;
       this.purity=data['menu'].purity;
       this.price=data['menu'].price;
       this.jewelery_type=data['menu'].jewelery_type;
       
      }).catch(d=>{
     });
     this.api.filterChange.subscribe(data=>{
       this.filter=this.api.getfilter();
      
     })
  }
  
}
