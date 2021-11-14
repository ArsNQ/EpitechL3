/*
** EPITECH PROJECT, 2019
** my_compute_power_rec
** File description:
** Task04
*/

int my_compute_power_rec(int nb, int power)
{
    if (power == 0)
        return (1);
    if (power < 0)
        return (0);

    return nb * my_compute_power_rec(nb, power - 1);
}