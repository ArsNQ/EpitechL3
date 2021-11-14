/*
** EPITECH PROJECT, 2019
** my_print_digits
** File description:
** Task03
*/

int my_print_digits(void)
{
    int digits;
        for (digits = '0'; digits <= '9'; ++digits)
        {
            my_putchar(digits);
        }
    return 0;
}
