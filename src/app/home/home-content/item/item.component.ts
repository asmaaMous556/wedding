import { ItemService } from './../../../shared/services/item/item.service';
import { Component, OnInit } from '@angular/core';
import { item } from 'src/app/shared/models/items';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
items: item[];
input=new FormControl();
filteredItems : item[];
  constructor(private itemService: ItemService) { }
  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items.map(item => {
        return{
          key: item.key,
          companyKey: item.payload.val()['companyKey'],
          titleAr: item.payload.val()['titleAr'],
          titleEn: item.payload.val()['titleEn'],
          info: item.payload.val()['info'],
          imageUrl: item.payload.val()['imageUrl'],
          price: item.payload.val()['price']

        };
      })
      this.filteredItems=this.items 
    });
    this.input.valueChanges.pipe(debounceTime(300)).subscribe(value=>{
      
      console.log(value);
      if(value){
       return this.filteredItems= this.items.filter(item=>{
           return (item.titleAr.includes(value) || item.titleEn.toLowerCase().includes(value));
              })
         }
         else{
        return  this.filteredItems=this.items;  
        }
    })

  }


  delete(key){

    if (!confirm('حذف الشركة؟')) { return ; }
    {
      this.itemService.deleteItem(key);
    }
  }

}
