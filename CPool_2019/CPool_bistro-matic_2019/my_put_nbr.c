/*
** EPITECH PROJECT, 2019
** my_put_chr
** File description:
** display all the possible two digits characters by two
*/

#include <stdio.h>

void my_putchar(char caractere);

void my_put_nbr(int n)
{
    int	mod;
    if (n < 0){
        my_putchar('-');
        n = n * (-1);
    }
    if (n >= 0){
        if (n >= 10){
            mod = (n % 10);
            n = (n - mod) / 10;
            my_put_nbr(n);
            my_putchar(48 + mod);
        }
        else
            my_putchar(48 + n % 10);
    }
}