/*
** EPITECH PROJECT, 2019
** my_compute_square_root
** File description:
** Task05
*/

int my_compute_square_root(int nb)
{
    int racine = 0;
    int result = 0;

    if (result < 0)
        return 0;

    else if (nb == 0 || nb == 1)
        return nb;
    else
    {
        while (result < nb){
            ++racine;
            result = racine * racine;
        }
        if (racine > 46340 || result > nb)
        {
            return (0);
        }
        return racine;
    }
}