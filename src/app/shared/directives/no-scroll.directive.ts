import { Directive, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoScroll]'
})
export class NoScrollDirective {

  private readonly renderer = inject(Renderer2)

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'overflow');
  }

}
