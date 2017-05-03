import { Component, h, Ionic } from '../index';


@Component({
  tag: 'ion-list',
  styleUrls: {
    ios: 'list.ios.scss',
    md: 'list.md.scss',
    wp: 'list.wp.scss'
  }
})
export class List {
  render() {
    return h(this, Ionic.theme(this, 'list'),
      h('slot')
    );
  }
}