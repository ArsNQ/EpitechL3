/*
** EPITECH PROJECT, 2019
** my_print_revalpha
** File description:
** Task02
*/

int my_print_revalpha(void)
{
    char alphabet = 'z';
        for (alphabet = 'z'; alphabet >= 'a'; --alphabet)
        {
            my_putchar(alphabet);
        }
    return 0;
}
