import { Component } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: 'person.page.html',
  styleUrls: ['person.page.scss'],
})
export class PersonPage {
  value = '';
  constructor() {
    this.value = `
    因为我本人长期受神经质困扰，后来再阅读了森田疗法的书箱后帮助很大，希望森田疗法能帮助更多的人。
    但是有一部分人可能因为某些原因不能读纸质书籍，所以开发了这个 app。因为本人能力有限，只是开发了
    一部分功能，以后会尽力去维护。如果多一些程序员一起维护就更好了。
    希望大家有新的电子书，能分享一下。
    发到这个邮箱即可：styunan@163.com
    这是我的工程网址：https://github.com/huyunan/sentian-app
    `;
  }
}
