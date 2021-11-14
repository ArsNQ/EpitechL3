/*
** EPITECH PROJECT, 2019
** my_swap
** File description:
** Task01
*/

void my_swap(int *a, int *b)
{
    int swapmeister = *a;
    *a = *b;
    *b = swapmeister;
}
