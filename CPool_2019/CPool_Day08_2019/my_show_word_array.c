/*
** EPITECH PROJECT, 2019
** my_show_word_array
** File description:
** task03
*/

#include "include/my.h"

int my_show_word_array(char * const *tab)
{
    int i = 0;

    while (tab[i]){
        my_putstr(tab[i]);
        i++;
        my_putchar('\n');
    }
    return (0);
}
