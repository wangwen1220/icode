<?php
ob_start();
function runSQL($rsql) {
	$hostname = 'localhost';// 数据库服务器
	$username = 'root';		// 数据库用户名
	$password = '123';	    // 数据库密码
	$dbname   = 'ld';			// 数据库名
	$connect = mysql_connect($hostname,$username,$password) or die ("Error: could not connect to database");
	$db = mysql_select_db($dbname);
	mysql_query('set names utf8');
	$result = mysql_query($rsql); 
	return $result;
	mysql_close($connect);
}
include("include/JSON.php");
if(isset($_GET['parent_id'])){
	$where = "WHERE parent_id = ".$_GET['parent_id']." ";
}else{
	$where = "WHERE parent_id = 0 ";
}

$sql = "SELECT * FROM region $where";
$result = runSQL($sql);
$data_type = "json";
if(isset($_GET['data_type'])){
	$data_type = $_GET['data_type'];
}
if($data_type == "json"){
	$json_str = "[";
	$json = array();
	while ($row = mysql_fetch_array($result)) {
		$r = array('region_id' => $row['region_id'],
		           'region_name' => $row['region_name']);
		$json[] = JSON($r);
	}
	$json_str .= implode(',',$json);
	$json_str .= "]";
	echo $json_str;	
}else if($data_type == "xml"){
    header("Content-type: text/xml;");
	$xml = "<?xml version='1.0' encoding='UTF-8'?>";
	$xml .= "<root>";
	while ($row = mysql_fetch_array($result)) {
		$xml .= "<record>";
			$xml .= "<region_id>".$row['region_id']."</region_id>";
			$xml .= "<region_name>".$row['region_name']."</region_name>";
		$xml .= "</record>";
	}
	$xml .="</root>";
	echo $xml;	
}
?>