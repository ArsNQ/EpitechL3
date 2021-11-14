/*
** EPITECH PROJECT, 2019
** my_print_comb
** File description:
** Task05
*/

int my_print_comb(void)
{
    int nbr1, nbr2, nbr3;
    for (nbr1 = '0'; nbr1 <= '7'; nbr1++)
    {
        for (nbr2 = nbr1+1; nbr2 <= '8'; nbr2++)
        {
            for (nbr3 = nbr2+1; nbr3 <= '9'; nbr3++)
            {
                my_putchar(nbr1);
                my_putchar(nbr2);
                my_putchar(nbr3);
                if (nbr1 != '7' || nbr2 != '8' || nbr3 != '9'){
                my_putchar(',');
                my_putchar(' ');}
            }
        }
    }
    return 0;
}
