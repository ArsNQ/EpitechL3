<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Stock;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    /**
     * @Route("/api", name="api")
     */
    public function index()
    {
        return $this->render('api/index.html.twig', [
            'controller_name' => 'ApiController',
        ]);
    }

    /**
     * @Route("/register", methods={"POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return Response
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $email = json_decode($request->getContent(), true)['email'];
        if (preg_match("#^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$#", $email)) {
            $password = json_decode($request->getContent(), true)['password'];
            $firstname = json_decode($request->getContent(), true)['firstname'];
            $lastname = json_decode($request->getContent(), true)['lastname'];

            $user = new User($email);

            $new_user = new User();
            $new_user->setEmail($email);
            $new_user->setPassword($encoder->encodePassword($new_user, $password));
            $new_user->setFirstName($firstname);
            $new_user->setLastName($lastname);

            $entityManager = $this->getDoctrine()->getManager();

            $entityManager->persist($new_user);
            $entityManager->flush();
            return new Response ("success", 201);
        } else {
            return new Response ("failure please enter correct email format", 400);
        }
    }

    /**
     * @Route("/search/{slug}", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function search(Request $request, $slug)
    {
        $conn = $this->getDoctrine()->getConnection();

        $sql = 'SELECT * FROM products p WHERE p.name like "%'.$slug.'%"';
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        return new Response(json_encode($stmt->fetchAll()) , 200);
    }

    /**
     * @Route("/api/order_item_by_order/{slug}", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function order_item_by_order(Request $request, $slug)
    {
        $conn = $this->getDoctrine()->getConnection();

        $sql = 'SELECT * FROM order_item oi WHERE oi.order_id = '.$slug;
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        return new Response(json_encode($stmt->fetchAll()) , 200);
    }

    /**
     * @Route("/api/get_orders", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function get_orders(Request $request)
    {
        $header_authorization = $request->headers->get('Authorization');
        $token = substr($header_authorization, 7);

        $tokenParts = explode(".", $token);
        $tokenPayload = base64_decode($tokenParts[1]);
        $email = json_decode($tokenPayload)->username;


        $conn = $this->getDoctrine()->getConnection();

        if (strpos($tokenPayload, "ROLE_ADMIN")) {
            $sql = 'SELECT * FROM my_order o';
            $stmt = $conn->prepare($sql);
            $stmt->execute();

            return new Response(json_encode($stmt->fetchAll()) , 200);
        } else {
            $sql = 'SELECT * FROM my_order o INNER JOIN user u ON u.id = o.user_id and u.email = "'.$email.'"';
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            return new Response(json_encode($stmt->fetchAll()) , 200);
        }
    }

    /**
     * @Route("/get_user_email/{slug}", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function get_user_email(Request $request, $slug)
    {
        $conn = $this->getDoctrine()->getConnection();

        $sql = 'SELECT * FROM user u WHERE u.email = "'.$slug.'"';
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        return new Response(json_encode($stmt->fetchAll()) , 200);
    }

    /**
     * @Route("/user", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function user(Request $request)
    {
        $header_authorization = $request->headers->get('Authorization');
        $token = substr($header_authorization, 7);

        $tokenParts = explode(".", $token);
        $tokenPayload = base64_decode($tokenParts[1]);
        $email = json_decode($tokenPayload)->username;


        $conn = $this->getDoctrine()->getConnection();

        $sql = 'SELECT u.email, u.firstname, u.id, u.roles, u.address, u.birthdate, u.lastname FROM user u WHERE u.email = "'.$email.'"';
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        return new Response(json_encode($stmt->fetchAll()) , 200);
    }

    /**
     * @Route("/api/get_custom_stock", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function get_custom_stock(Request $request)
    {
        $conn = $this->getDoctrine()->getConnection();

        $sql = 'SELECT * FROM stock s LEFT JOIN products p ON p.id = s.product_id';
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        return new Response(json_encode($stmt->fetchAll()) , 200);
    }

    /**
     * @Route("/api/edit_stock_by_product/{slug}/{qty}", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function edit_stock_by_product(Request $request, $slug, $qty) // Editer le stock par le product_id
    {
        $conn = $this->getDoctrine()->getConnection();

        $sql = "SELECT s.id from stock s where s.product_id = ".$slug;
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        if ($stmt->fetchAll() != []) {
            $id = $stmt->fetchAll()[0]["id"];
            $sql = "UPDATE stock SET quantity = ".$qty." WHERE id = ".intval($id);
            $stmt = $conn->prepare($sql);
            $stmt->execute();
        } else {
            $stock = new Stock();
            $stock->setProductId($slug);
            $stock->setQuantity($qty);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($stock);
            $entityManager->flush();
        }


        return new Response("success" , 200);
    }

    /**
     * @Route("/api/get_stock_id/{slug}", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function get_stock_id(Request $request, $slug)
    {
        $conn = $this->getDoctrine()->getConnection();

        $sql = 'SELECT * FROM stock s WHERE s.product_id = '.$slug;
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        return new Response(json_encode($stmt->fetchAll()) , 200);
    }
}
