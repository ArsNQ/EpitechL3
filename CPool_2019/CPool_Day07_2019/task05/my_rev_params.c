/*
** EPITECH PROJECT, 2019
** my_print_params
** File description:
** Task04
*/

int main(int argc, char **argv)
{
    int i = 0;

    while (argc > 0)
    {
        --argc;
        my_putstr(argc[argv]);
        my_putchar('\n');
    }

    while (i < argc)
    {
        my_putstr(argv[i]);
        i++;
        my_putchar('\n');
    }
    return 0;
}