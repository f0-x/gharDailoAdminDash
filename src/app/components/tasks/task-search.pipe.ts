import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskSearch'
})
export class TaskSearchPipe implements PipeTransform {

  transform(list: any[], value: string) {
    return value ? list.filter(item => item.client.toLowerCase().includes(value.toLowerCase())) : list;
  }

}
