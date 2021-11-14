/*
** EPITECH PROJECT, 2019
** cat
** File description:
** task01
*/

#include <unistd.h>
#include <fcntl.h>
#include <stdlib.h>
#include <sys/stat.h>

int main(int ac, char **av)
{
    int ret, fd;
    char buffer[1024];

    if (ac == 1){
        while (1){
            ret = read(0, buffer, 1024);
            write(1, buffer, ret);
        }
    }
    else{
        for (int i = 1; i < ac; ++i){
            fd = open(av[i], O_RDONLY);
            if (fd == -1)
                return (84);
            while (ret = read(fd, buffer, 1024))
                write(1, buffer, ret);
            close(fd);
        }
    }
    return (0);
}