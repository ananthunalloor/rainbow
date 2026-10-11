# Overlay Test Matrix

Every overlay must be tested in Storybook and the plain HTML gallery.

| Behavior | Dialog | Popover | Menu | Tooltip |
| --- | --- | --- | --- | --- |
| Escape closes | required | required | required | n/a |
| Outside pointer closes | modal: no | required | required | n/a |
| Focus restoration | required | required | required | required |
| Keyboard focus entry | required | required | required | required |
| Accessible naming | required | required | required | required |
| Shadow DOM safe | required | required | required | required |
| HTMX replacement safe | required | required | required | required |
| RTL placement | next overlay phase | next overlay phase | next overlay phase | next overlay phase |
| Collision handling | next overlay phase | next overlay phase | next overlay phase | next overlay phase |
