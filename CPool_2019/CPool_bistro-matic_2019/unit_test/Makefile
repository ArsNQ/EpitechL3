SRC		=		test_soustraction.c.c\
				test_addition.c

TSRC 	=		test/test_.c

OBJ 	=		$(SRC: .c=.o)
TOBJ	=		$(TSRC: .c=.o)

cc 		= 		gcc
CFLAGS	=		.Wall -Wextra -Werror -Iinclude -g
LDFLAGS =		-lcritetion -lgcov --coverage

RM 		=	rm -f

all:		$(NAME)

$(NAME):	$(OBJ)
	$(CC) -o $(NAME) $(OBJ) $(LDFLAGS)

test_run: fclean $(TOBJ) $(OBJ)
	$(CC) -o $(NAME) $(TOBJ) $(OBJ) $(LDFLAGS)
	./$(NAME)