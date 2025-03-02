import { animate, style, transition, trigger } from "@angular/animations"

export const fadeInOut = trigger("fadeInOut", [
  transition(":enter", [
    style({ opacity: 0, right: "-120px" }),
    animate("300ms", style({ opacity: 1, right: "0px" })),
  ]),
  transition(":leave", [
    animate(
      "300ms",
      style({ opacity: 0, right: "-120px", "margin-bottom": "-80px" })
    ),
  ]),
])
