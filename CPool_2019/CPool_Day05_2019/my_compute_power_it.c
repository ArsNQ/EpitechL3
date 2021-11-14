/*
** EPITECH PROJECT, 2019
** my_compute_power_it
** File description:
** Task03
*/

int my_compute_power_it(int nb, int p)
{
    int total = 1;
    long check = 1;

    if (p == 0)
        return (1);
    else if (p < 0)
        return (0);

    while (p > 0)
    {
        check = check * nb;
        p--;
    }

    if (check < -2147483647 || check > 2147483647)
        return (0);
    return total = check;
}