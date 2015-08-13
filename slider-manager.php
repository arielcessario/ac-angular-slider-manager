<?php
session_start();
session_start();
if (file_exists('./MyDBi.php')) {
    require_once 'MyDBi.php';
} else {
    require_once '../../MyDBi.php';
}

$data = file_get_contents("php://input");

$decoded = json_decode($data);
if ($decoded != null) {
    if ($decoded->function == 'saveSlider') {
        foreach (json_decode($decoded->sliders) as $slider) {
//            $of = $slider;
            saveSlider($slider);
        }
    }
} else {

    $function = $_GET["function"];
    if ($function == 'getSlider') {
        getSlider($_GET["conProductos"]);
    }

}


function getSlider($conProductos)
{
    $db = new MysqliDb();

//    $results = $db->get('sliders');
//    $results = $db->rawQuery('Select slider_id, o.producto_id producto_id, kit_id, precio, o.descripcion descripcion,
//    imagen, titulo, p.nombre producto from sliders o inner join productos p on o.producto_id = p.producto_id;');

    $results = $db->rawQuery('Select oferta_id, o.producto_id producto_id, kit_id, precio, o.descripcion descripcion,
    imagen, titulo, 0 producto from ofertas o;');

    if ($conProductos) {
        foreach ($results as $key => $row) {
            $db->where('producto_id', $row["producto_id"]);
            $producto = $db->get('productos');
            $results[$key]["producto"] = $producto;
        }
    }

    echo json_encode($results);
}

function saveSlider($slider)
{
    $db = new MysqliDb();
    $item_decoded = $slider;
//    $fotos_decoded = json_decode($producto->fotos);
    $db->where('slider_id', $item_decoded->slider_id);
    $data = array(
        'producto_id' => $item_decoded->producto_id,
        'precio' => $item_decoded->precio,
        'descripcion' => $item_decoded->descripcion,
        'imagen' => $item_decoded->imagen,
        'titulo' => $item_decoded->titulo
    );


    $results = $db->update('sliders', $data);


    $res = ['status' => 1, 'results' => 0];

    echo json_encode($results);

    if ($results) {
        $res["results"] = $results;
        echo json_encode($res);

    } else {
        $res->status = 0;
        echo $res;
    }

}

