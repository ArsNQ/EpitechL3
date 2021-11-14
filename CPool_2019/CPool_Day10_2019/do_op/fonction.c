/*
** EPITECH PROJECT, 2019
** fonction
** File description:
** task02
*/

#include "my.h"

int addition(int a, int b)
{
    my_put_nbr(a + b);
    return (0);
}

int soustraction(int a, int b)
{
    my_put_nbr(a - b);
    return (0);
}

int multiplication(int a, int b)
{
    my_put_nbr(a * b);
    return (0);
}

int division(int a, int b)
{
    if (b == 0)
    {
        my_putstr("Stop: division by zero");
        return (84);
    }
    my_put_nbr(a / b);
    return (0);
}

int modulo(int a, int b)
{
    if (b == 0)
    {
        my_putstr("Stop: modulo by zero");
        return (84);
    }
    my_put_nbr(a % b);
    return (0);
}