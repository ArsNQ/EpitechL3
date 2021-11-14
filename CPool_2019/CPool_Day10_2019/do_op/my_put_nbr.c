/*
** EPITECH PROJECT, 2019
** my_put_nbr
** File description:
** my_put_nbr
*/

#include "my.h"

int my_put_nbr(int n)
{
    if (n == -2147483648)
    {
        n = 147483648;
        my_putstr("-2");
    }
    if (n < 0)
    {
        my_putchar('-');
        n = -n;
    }
    if (n >= 10)
        my_put_nbr(n / 10);
    my_putchar(n % 10 + 48);
    return 0;
}
