import { ItemService } from './../../../shared/services/item/item.service';
import { Component, OnInit } from '@angular/core';
import { item } from 'src/app/shared/models/items';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
items:item[];
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items=>{
      this.items=items.map(item=>{
        return{
          key:item.key,
          companyKey:item.payload.val()['companyKey'],
          titleAr:item.payload.val()['titleAr'],
          titleEn:item.payload.val()['titleEn'],
          info:item.payload.val()['info'],
          imageUrl:item.payload.val()['imageUrl'],
          price:item.payload.val()['price']
          
        }
      })
    })

  }

  
  delete(key){
  if(!confirm('حذف المنتج؟')) return ;
    {
      this.itemService.deleteItem(key);
    }
  }

}
