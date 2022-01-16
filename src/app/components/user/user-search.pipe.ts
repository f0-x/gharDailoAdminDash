import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(list: any[], value: string) {


    return value ? list.filter(item => item.text.toLowerCase().includes(value.toLowerCase())) : list;
  }

}
