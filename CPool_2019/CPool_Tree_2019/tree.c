/*
** EPITECH PROJECT, 2019
** tree
** File description:
** tree
*/

void tree(int size)
{
int space = 0;
int stage = 0;
int trunk = 0;

if (size == 1){
      for (int stage = 0; stage < 4; stage++){
         for (int space = stage + 1; space < 4; space++)
            my_putchar(' ');
         for (int space = 0; space <= 2 * stage; space++)
            my_putchar('*');
if (stage < 3)
            my_putchar('\n');
      }
      my_putchar('\n');
      for (trunk = 0; trunk < 3; trunk++) my_putchar(' ');
      my_putchar('|');
      my_putchar('\n');
   }
}