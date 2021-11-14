/*
** EPITECH PROJECT, 2019
** main
** File description:
** task02
*/

#include <stdio.h>
#include <unistd.h>
#include "fonction.c"
#include "my.h"

int main(int argc, char **argv)
{
    int a;
    int b;

    if (argc != 4)
        return (84);
    a = my_getnbr(argv[1]);
    b = my_getnbr(argv[3]);
    if (argv[2][0] == '+')
        return (addition(a, b));
    if (argv[2][0] == '-')
        return (soustraction(a, b));
    if (argv[2][0] == '*')
        return (multiplication(a, b));
    if (argv[2][0] == '/')
        return (division(a, b));
    if (argv[2][0] == '%')
        return (modulo(a, b));
    my_putchar('0');
    return (84);
}