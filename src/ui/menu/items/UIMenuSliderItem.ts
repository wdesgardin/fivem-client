import { Rectangle, Sprite } from '../../';
import { Color, Point, Size } from '../../../utils/';
import { UIMenuItem } from './';

export class UIMenuSliderItem extends UIMenuItem {
  private arrowLeft: Sprite;
  private arrowRight: Sprite;
  private arrowOnlyOnSelected: boolean;

  private rectangleBackground: Rectangle;
  private rectangleSlider: Rectangle;
  private rectangleDivider: Rectangle;

  private items: unknown[];

  private index: number;

  get Index(): number {
    return this.index % this.items.length;
  }

  set Index(value: number) {
    this.index = 100000000 - (100000000 % this.items.length) + value;
  }

  constructor(
    text: string,
    items: unknown[],
    index: number,
    description = '',
    divider = false,
    arrowOnlyOnSelected = false,
  ) {
    super(text, description);
    const y = 0;
    this.arrowOnlyOnSelected = arrowOnlyOnSelected;
    this.items = items;
    this.arrowLeft = new Sprite(
      'commonmenutu',
      'arrowleft',
      new Point(0, 105 + y),
      new Size(15, 15),
    );
    this.arrowRight = new Sprite(
      'commonmenutu',
      'arrowright',
      new Point(0, 105 + y),
      new Size(15, 15),
    );
    this.rectangleBackground = new Rectangle(
      new Point(),
      new Size(150, 9),
      new Color(255, 4, 32, 57),
    );
    this.rectangleSlider = new Rectangle(
      new Point(),
      new Size(75, 9),
      new Color(255, 57, 116, 200),
    );
    if (divider) {
      this.rectangleDivider = new Rectangle(new Point(), new Size(2.5, 20), Color.whiteSmoke);
    } else {
      this.rectangleDivider = new Rectangle(new Point(), new Size(2.5, 20), Color.transparent);
    }
    this.Index = index;
  }

  public setVerticalPosition(y: number): void {
    this.rectangleBackground.pos = new Point(
      250 + this.offset.X + this.parent.WidthOffset,
      y + 158.5 + this.offset.Y,
    );
    this.rectangleSlider.pos = new Point(
      250 + this.offset.X + this.parent.WidthOffset,
      y + 158.5 + this.offset.Y,
    );
    this.rectangleDivider.pos = new Point(
      323.5 + this.offset.X + this.parent.WidthOffset,
      y + 153 + this.offset.Y,
    );
    this.arrowLeft.pos = new Point(
      235 + this.offset.X + this.parent.WidthOffset,
      155.5 + y + this.offset.Y,
    );
    this.arrowRight.pos = new Point(
      400 + this.offset.X + this.parent.WidthOffset,
      155.5 + y + this.offset.Y,
    );

    super.setVerticalPosition(y);
  }

  public indexToItem(index: number): unknown {
    return this.items[index];
  }

  public draw(resolution?: Size): void {
    super.draw(resolution);
    this.arrowLeft.color = this.enabled
      ? this.selected
        ? Color.black
        : Color.whiteSmoke
      : new Color(255, 163, 159, 148);
    this.arrowRight.color = this.enabled
      ? this.selected
        ? Color.black
        : Color.whiteSmoke
      : new Color(255, 163, 159, 148);
    const offset =
      ((this.rectangleBackground.size.width - this.rectangleSlider.size.width) /
        (this.items.length - 1)) *
      this.Index;
    this.rectangleSlider.pos = new Point(
      250 + this.offset.X + offset + +this.parent.WidthOffset,
      this.rectangleSlider.pos.Y,
    );

    if (this.arrowOnlyOnSelected) {
      if (this.selected) {
        this.arrowLeft.draw(resolution);
        this.arrowRight.draw(resolution);
      }
    } else {
      this.arrowLeft.draw(resolution);
      this.arrowRight.draw(resolution);
    }

    this.rectangleBackground.draw(undefined, resolution);
    this.rectangleSlider.draw(undefined, resolution);
    this.rectangleDivider.draw(undefined, resolution);
  }
}
