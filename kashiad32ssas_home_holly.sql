-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 01, 2026 at 01:25 AM
-- Server version: 5.7.44
-- PHP Version: 8.1.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kashiad32ssas_home_holly`
--


--
-- Table structure for table `add_deliveryboy`
--

CREATE TABLE `add_deliveryboy` (
  `db_id` int(11) NOT NULL,
  `db_name` varchar(250) NOT NULL,
  `db_email` varchar(250) NOT NULL,
  `db_number` varchar(250) NOT NULL,
  `db_address` text NOT NULL,
  `db_pwd` varchar(250) NOT NULL,
  `db_empid` varchar(250) NOT NULL,
  `db_date` date NOT NULL DEFAULT '1970-01-01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `add_expences`
--

CREATE TABLE `add_expences` (
  `ex_id` int(11) NOT NULL,
  `ex_exhid` varchar(50) NOT NULL,
  `ex_emonth` varchar(100) NOT NULL,
  `ex_eyear` varchar(100) NOT NULL,
  `ex_eamount` varchar(100) NOT NULL,
  `ex_inhid` varchar(100) NOT NULL,
  `ex_imonth` varchar(100) NOT NULL,
  `ex_iyear` varchar(100) NOT NULL,
  `ex_iamount` varchar(100) NOT NULL,
  `ex_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `add_shade`
--

CREATE TABLE `add_shade` (
  `as_id` int(255) NOT NULL,
  `as_pid` varchar(255) NOT NULL,
  `as_name` varchar(255) NOT NULL,
  `as_color` varchar(255) NOT NULL,
  `as_img` text NOT NULL,
  `as_price` varchar(255) NOT NULL,
  `as_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `a_id` int(11) NOT NULL,
  `a_email` varchar(100) NOT NULL,
  `a_password` varchar(255) NOT NULL,
  `a_vpwd` varchar(100) NOT NULL,
  `a_name` varchar(100) NOT NULL,
  `a_desig` varchar(100) NOT NULL,
  `a_phone` varchar(15) NOT NULL,
  `a_address` tinytext NOT NULL,
  `a_qual` varchar(100) NOT NULL,
  `a_photo` varchar(100) NOT NULL,
  `a_usertype` varchar(10) NOT NULL COMMENT 'For User Privilege 1 for Admin',
  `a_status` varchar(2) NOT NULL COMMENT '1 Approve/ 2 Not Approve',
  `a_pagepermission` varchar(100) NOT NULL,
  `a_sms` varchar(20) NOT NULL,
  `a_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `assign_order`
--

CREATE TABLE `assign_order` (
  `os_id` int(11) NOT NULL,
  `os_orderid` varchar(100) NOT NULL,
  `os_dbid` varchar(10) NOT NULL,
  `os_date` date DEFAULT '1970-01-01',
  `os_pipdate` varchar(250) NOT NULL,
  `os_dldate` varchar(250) NOT NULL,
  `os_dlotp` varchar(50) NOT NULL,
  `os_conotp` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `bl_id` int(250) NOT NULL,
  `bl_img` varchar(250) NOT NULL,
  `bl_title` varchar(250) NOT NULL,
  `bl_content` text NOT NULL,
  `date` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `booknow`
--

CREATE TABLE `booknow` (
  `bk_id` int(11) NOT NULL,
  `bk_pid` varchar(50) NOT NULL,
  `bk_amount` varchar(100) NOT NULL,
  `bk_name` varchar(100) NOT NULL,
  `bk_number` varchar(250) NOT NULL,
  `bk_email` varchar(250) NOT NULL,
  `bk_state` varchar(250) NOT NULL,
  `bk_city` varchar(250) NOT NULL,
  `bk_address` text NOT NULL,
  `bk_date` date NOT NULL DEFAULT '1970-01-01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `br_id` int(11) NOT NULL,
  `br_name` varchar(100) NOT NULL,
  `br_image` varchar(250) NOT NULL,
  `br_keyword` varchar(250) NOT NULL,
  `br_des` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `cancellation`
--

CREATE TABLE `cancellation` (
  `c_id` int(11) NOT NULL,
  `c_content` mediumtext NOT NULL,
  `c_status` varchar(10) NOT NULL,
  `c_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `cartdetails`
--

CREATE TABLE `cartdetails` (
  `cd_id` int(11) NOT NULL,
  `cd_coid` varchar(50) NOT NULL,
  `cd_pid` varchar(50) NOT NULL,
  `cd_price` varchar(100) NOT NULL,
  `cd_qty` varchar(100) NOT NULL,
  `cd_netprice` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(100) NOT NULL,
  `cat_seq` varchar(50) NOT NULL,
  `cat_image` varchar(250) NOT NULL,
  `cat_status` varchar(10) NOT NULL,
  `cat_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `cit_id` int(11) NOT NULL,
  `cit_distid` varchar(80) NOT NULL,
  `cit_stid` varchar(80) NOT NULL,
  `cit_cnid` varchar(50) NOT NULL,
  `cit_name` varchar(100) NOT NULL,
  `cit_dtime` varchar(100) NOT NULL,
  `cit_dcharge` varchar(50) NOT NULL,
  `cit_status` varchar(10) NOT NULL,
  `cit_cdate` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `complain_suggest`
--

CREATE TABLE `complain_suggest` (
  `cs_id` int(11) NOT NULL,
  `cs_nuid` int(50) NOT NULL,
  `cs_content` text NOT NULL,
  `cs_status` int(10) NOT NULL,
  `cs_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `ct_id` int(11) NOT NULL,
  `ct_name` varchar(256) NOT NULL,
  `ct_phone` bigint(10) NOT NULL,
  `ct_email` varchar(256) NOT NULL,
  `ct_comment` text NOT NULL,
  `ct_status` tinyint(1) NOT NULL,
  `ct_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `cu_id` int(11) NOT NULL,
  `cu_content` mediumtext NOT NULL,
  `cu_number` varchar(250) NOT NULL,
  `cu_email` varchar(250) NOT NULL,
  `cu_status` varchar(10) NOT NULL,
  `cu_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `cn_id` int(11) NOT NULL,
  `cn_name` varchar(100) NOT NULL,
  `cn_price` decimal(10,2) NOT NULL,
  `cn_status` varchar(10) NOT NULL,
  `cn_cdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `coupon_code`
--

CREATE TABLE `coupon_code` (
  `cc_id` int(11) NOT NULL,
  `cc_fdate` varchar(250) NOT NULL,
  `cc_tdate` varchar(250) NOT NULL,
  `cc_code` varchar(100) NOT NULL,
  `cc_amount` varchar(250) NOT NULL,
  `cc_maxamount` varchar(250) NOT NULL,
  `cc_status` varchar(10) NOT NULL,
  `cc_cdate` date NOT NULL DEFAULT '1970-01-01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `create_page`
--

CREATE TABLE `create_page` (
  `pg_id` int(11) NOT NULL,
  `pg_name` varchar(100) NOT NULL,
  `pg_title` varchar(100) NOT NULL,
  `pg_desc` text NOT NULL,
  `pg_status` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `delivery_status`
--

CREATE TABLE `delivery_status` (
  `dv_id` int(11) NOT NULL,
  `dv_oid` varchar(50) NOT NULL,
  `dv_remarks` varchar(250) NOT NULL,
  `dv_status` varchar(250) NOT NULL,
  `dv_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `dist_id` int(11) NOT NULL,
  `dist_stid` varchar(80) NOT NULL,
  `dist_cnid` varchar(50) NOT NULL,
  `dist_name` varchar(100) NOT NULL,
  `dist_code` varchar(100) NOT NULL,
  `dist_status` varchar(10) NOT NULL,
  `dist_cdate` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `exphead`
--

CREATE TABLE `exphead` (
  `exh_id` int(11) NOT NULL,
  `exh_name` varchar(100) NOT NULL,
  `exh_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `feed_back`
--

CREATE TABLE `feed_back` (
  `f_id` int(11) NOT NULL,
  `f_name` varchar(100) NOT NULL,
  `f_email` varchar(250) NOT NULL,
  `f_subject` varchar(100) NOT NULL,
  `f_msg` mediumtext NOT NULL,
  `f_status` varchar(10) NOT NULL,
  `f_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `final_form`
--

CREATE TABLE `final_form` (
  `fi_id` int(250) NOT NULL,
  `fi_dis` varchar(250) NOT NULL,
  `fi_user_id` varchar(250) NOT NULL,
  `fi_name` varchar(250) NOT NULL,
  `fi_email` varchar(250) NOT NULL,
  `fi_mob` varchar(250) NOT NULL,
  `fi_gender` varchar(250) NOT NULL,
  `fi_weight` varchar(250) NOT NULL,
  `fi_height` varchar(250) NOT NULL,
  `fi_age` varchar(250) NOT NULL,
  `fi_doct` varchar(250) NOT NULL,
  `fi_report` varchar(250) NOT NULL,
  `fi_foot1` varchar(250) NOT NULL,
  `fi_foot2` varchar(252) NOT NULL,
  `fi_foot3` varchar(250) NOT NULL,
  `fi_foot4` varchar(250) NOT NULL,
  `fi_foot5` varchar(250) NOT NULL,
  `fi_foot6` varchar(250) NOT NULL,
  `fi_ssize` varchar(250) NOT NULL,
  `fi_stype` varchar(250) NOT NULL,
  `fi_purpose` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `inchead`
--

CREATE TABLE `inchead` (
  `inh_id` int(11) NOT NULL,
  `inh_name` varchar(100) NOT NULL,
  `inh_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `kyc`
--

CREATE TABLE `kyc` (
  `ky_id` int(11) NOT NULL,
  `ky_nuid` varchar(50) NOT NULL,
  `ky_adharano` varchar(100) NOT NULL,
  `ky_adharadoc` varchar(250) NOT NULL,
  `ky_panno` varchar(100) NOT NULL,
  `ky_addsts` tinyint(1) NOT NULL DEFAULT '0',
  `ky_pansts` tinyint(1) NOT NULL DEFAULT '0',
  `ky_pandoc` varchar(250) NOT NULL,
  `ky_bankname` varchar(100) NOT NULL,
  `ky_acno` varchar(100) NOT NULL,
  `ky_ifsccode` varchar(100) NOT NULL,
  `ky_branch` varchar(100) NOT NULL,
  `ky_date` date NOT NULL DEFAULT '1970-01-01',
  `ky_status` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `legal`
--

CREATE TABLE `legal` (
  `lg_id` int(11) NOT NULL,
  `lg_title` varchar(250) NOT NULL,
  `lg_name` varchar(250) NOT NULL,
  `lg_status` tinyint(4) NOT NULL,
  `lg_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `loc_details`
--

CREATE TABLE `loc_details` (
  `loc_id` int(250) NOT NULL,
  `loc_name` varchar(250) NOT NULL,
  `lc_det` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `manage_appoint`
--

CREATE TABLE `manage_appoint` (
  `ma_id` int(250) NOT NULL,
  `ma_image` varchar(250) NOT NULL,
  `ma_desc` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `new_user`
--

CREATE TABLE `new_user` (
  `nu_id` int(11) NOT NULL,
  `nu_name` varchar(100) NOT NULL,
  `nu_number` bigint(10) NOT NULL,
  `nu_email` varchar(250) NOT NULL,
  `nu_pwd` varchar(250) NOT NULL,
  `nu_vpwd` varchar(250) NOT NULL,
  `nu_image` varchar(250) NOT NULL,
  `nu_status` smallint(4) NOT NULL,
  `nu_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01',
  `nu_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` int(250) NOT NULL,
  `p_name` varchar(250) NOT NULL,
  `p_image` varchar(250) NOT NULL,
  `quantity` varchar(250) NOT NULL,
  `content` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `offer_amount`
--

CREATE TABLE `offer_amount` (
  `of_id` int(11) NOT NULL,
  `of_offamount` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `offer_image`
--

CREATE TABLE `offer_image` (
  `of_id` int(11) NOT NULL,
  `of_image` varchar(250) NOT NULL,
  `of_status` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `offer_img`
--

CREATE TABLE `offer_img` (
  `oi_id` int(250) NOT NULL,
  `oi_img` varchar(250) NOT NULL,
  `oi_status` int(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `order_nuid` varchar(50) NOT NULL,
  `order_total` varchar(250) NOT NULL,
  `order_amount` varchar(50) NOT NULL,
  `order_uid` varchar(100) NOT NULL,
  `order_shipid` varchar(50) NOT NULL,
  `order_dcharges` varchar(100) NOT NULL,
  `order_type` varchar(50) NOT NULL,
  `order_status` varchar(256) NOT NULL,
  `order_payment` varchar(50) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01',
  `order_ship_amt` decimal(10,2) DEFAULT NULL,
  `order_cty` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `pincode`
--

CREATE TABLE `pincode` (
  `pn_id` int(11) NOT NULL,
  `pn_cnid` varchar(50) NOT NULL,
  `pn_stid` varchar(50) NOT NULL,
  `pn_distid` varchar(50) NOT NULL,
  `pn_citid` varchar(50) NOT NULL,
  `pn_pincode` varchar(100) NOT NULL,
  `pn_dcharges` varchar(100) NOT NULL,
  `pn_status` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `privacy_policy`
--

CREATE TABLE `privacy_policy` (
  `pp_id` int(11) NOT NULL,
  `pp_content` mediumtext NOT NULL,
  `pp_status` varchar(10) NOT NULL,
  `pp_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `p_id` int(11) NOT NULL,
  `p_slid` varchar(50) NOT NULL,
  `p_catid` varchar(50) NOT NULL,
  `p_scatid` varchar(50) NOT NULL,
  `p_scname` varchar(250) NOT NULL,
  `p_name` varchar(250) NOT NULL,
  `p_code` varchar(100) NOT NULL,
  `p_price` varchar(50) NOT NULL,
  `p_discount` varchar(250) NOT NULL,
  `p_weight` decimal(10,3) NOT NULL,
  `p_description` mediumtext NOT NULL,
  `p_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01',
  `p_status` int(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `product_color`
--

CREATE TABLE `product_color` (
  `pclr_id` int(11) NOT NULL,
  `pclr_pid` varchar(50) NOT NULL,
  `pclr_name` varchar(100) NOT NULL,
  `pclr_image` varchar(250) NOT NULL,
  `pclr_status` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `product_features`
--

CREATE TABLE `product_features` (
  `pf_id` int(11) NOT NULL,
  `pf_p_id` varchar(10) NOT NULL,
  `pf_name` varchar(256) NOT NULL,
  `pf_price` decimal(10,2) NOT NULL,
  `pf_status` tinyint(1) NOT NULL,
  `pf_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `pm_id` int(11) NOT NULL,
  `pm_pid` varchar(50) NOT NULL,
  `pm_image` varchar(250) NOT NULL,
  `pm_status` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `product_pincode`
--

CREATE TABLE `product_pincode` (
  `pp_id` int(255) NOT NULL,
  `pp_pid` int(255) NOT NULL,
  `pp_stid` varchar(255) NOT NULL,
  `pp_ctid` varchar(255) NOT NULL,
  `pp_pincode` varchar(255) NOT NULL,
  `pp_delivery` varchar(255) NOT NULL,
  `pp_status` int(255) NOT NULL,
  `pp_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--

--
-- Table structure for table `product_review`
--

CREATE TABLE `product_review` (
  `pr_id` int(250) NOT NULL,
  `pr_pid` int(250) NOT NULL,
  `pr_name` varchar(250) NOT NULL,
  `pr_title` varchar(250) NOT NULL,
  `pr_link` varchar(250) NOT NULL,
  `pr_img1` varchar(250) NOT NULL,
  `pr_desc` text NOT NULL,
  `pr_date` varchar(250) NOT NULL,
  `pr_status` int(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `product_size`
--

CREATE TABLE `product_size` (
  `ps_id` int(11) NOT NULL,
  `ps_pid` varchar(50) NOT NULL,
  `ps_size` varchar(50) NOT NULL,
  `ps_status` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `product_video`
--

CREATE TABLE `product_video` (
  `pv_id` int(250) NOT NULL,
  `pv_pid` varchar(250) NOT NULL,
  `pv_pvid` varchar(250) NOT NULL,
  `pv_status` int(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `pur_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `a_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `pv_report`
--

CREATE TABLE `pv_report` (
  `pr_id` int(11) NOT NULL,
  `pr_nuid` int(11) NOT NULL,
  `pr_orid` int(11) NOT NULL,
  `pr_pv` int(11) NOT NULL,
  `pr_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `rt_id` int(11) NOT NULL,
  `rt_pid` varchar(50) NOT NULL,
  `rt_nuid` varchar(50) NOT NULL,
  `rt_rating` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `return_policy`
--

CREATE TABLE `return_policy` (
  `rp_id` int(11) NOT NULL,
  `rp_content` mediumtext NOT NULL,
  `rp_status` varchar(10) NOT NULL,
  `rp_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `re_id` int(11) NOT NULL,
  `re_pid` varchar(11) NOT NULL,
  `re_nuid` varchar(50) NOT NULL,
  `re_desc` mediumtext NOT NULL,
  `re_title` varchar(100) NOT NULL,
  `re_name` varchar(100) NOT NULL,
  `re_image` varchar(250) NOT NULL,
  `re_status` varchar(10) NOT NULL,
  `re_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `review_image`
--

CREATE TABLE `review_image` (
  `ri_id` int(250) NOT NULL,
  `ri_prid` int(11) NOT NULL,
  `ri_image` varchar(250) NOT NULL,
  `ri_status` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `seller_registration`
--

CREATE TABLE `seller_registration` (
  `sl_id` int(11) NOT NULL,
  `sl_name` varchar(250) NOT NULL,
  `nu_businessname` varchar(250) NOT NULL,
  `nu_gstno` varchar(100) NOT NULL,
  `sl_number` varchar(250) NOT NULL,
  `sl_email` varchar(250) NOT NULL,
  `sl_pwd` varchar(250) NOT NULL,
  `sl_otp` varchar(50) NOT NULL,
  `sl_cnid` varchar(50) NOT NULL,
  `sl_stid` varchar(50) NOT NULL,
  `sl_distid` varchar(50) NOT NULL,
  `sl_citid` varchar(50) NOT NULL,
  `sl_pin` varchar(50) NOT NULL,
  `sl_status` varchar(10) NOT NULL,
  `sl_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `seminar`
--

CREATE TABLE `seminar` (
  `sem_id` int(11) NOT NULL,
  `sem_title` varchar(255) NOT NULL,
  `sem_desc` text NOT NULL,
  `sem_link` varchar(255) NOT NULL,
  `sem_img` varchar(255) NOT NULL,
  `sem_status` tinyint(4) NOT NULL,
  `sem_updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `shipping_details`
--

CREATE TABLE `shipping_details` (
  `spp_id` int(11) NOT NULL,
  `spp_nuid` varchar(50) NOT NULL,
  `spp_email` varchar(255) NOT NULL,
  `spp_name` varchar(100) NOT NULL,
  `spp_number` varchar(250) NOT NULL,
  `spp_state` varchar(100) NOT NULL,
  `spp_city` varchar(100) NOT NULL,
  `spp_pin` varchar(100) NOT NULL,
  `spp_address` mediumtext NOT NULL,
  `spp_landmark` varchar(255) NOT NULL,
  `spp_default` varchar(10) NOT NULL,
  `spp_status` varchar(10) NOT NULL,
  `spp_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `slider_img`
--

CREATE TABLE `slider_img` (
  `img_id` int(11) NOT NULL,
  `img_title` varchar(250) NOT NULL,
  `img_name` varchar(250) NOT NULL,
  `img_status` varchar(50) NOT NULL,
  `img_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `social_link`
--

CREATE TABLE `social_link` (
  `sl_id` int(11) NOT NULL,
  `sl_flink` varchar(100) NOT NULL,
  `sl_tlink` varchar(100) NOT NULL,
  `sl_ylink` varchar(100) NOT NULL,
  `sl_ilink` varchar(100) NOT NULL,
  `sl_tglink` varchar(100) NOT NULL,
  `sl_tglink2` varchar(100) NOT NULL,
  `sl_tglink3` varchar(100) NOT NULL,
  `sl_status` varchar(10) NOT NULL,
  `sl_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01',
  `tds` decimal(10,0) NOT NULL,
  `del_charge` decimal(10,2) NOT NULL,
  `min_del` decimal(10,2) NOT NULL,
  `ruby` int(11) NOT NULL,
  `pearl` int(11) NOT NULL,
  `silver` int(11) NOT NULL,
  `gold` int(11) NOT NULL,
  `diamond` int(11) NOT NULL,
  `platinum` int(11) NOT NULL,
  `emerald` int(11) NOT NULL,
  `crown` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `special_offer`
--

CREATE TABLE `special_offer` (
  `so_id` int(11) NOT NULL,
  `so_details` varchar(256) NOT NULL,
  `so_status` int(10) NOT NULL,
  `so_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `st_id` int(11) NOT NULL,
  `st_cnid` varchar(50) NOT NULL,
  `st_name` varchar(100) NOT NULL,
  `st_code` varchar(100) NOT NULL,
  `st_status` varchar(10) NOT NULL,
  `st_cdate` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `st_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `scat_id` int(11) NOT NULL,
  `scat_catid` varchar(50) NOT NULL,
  `scat_name` varchar(100) NOT NULL,
  `scat_image` varchar(250) NOT NULL,
  `scat_status` varchar(10) NOT NULL,
  `scat_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


--
-- Table structure for table `sub_product`
--

CREATE TABLE `sub_product` (
  `sp_id` int(11) NOT NULL,
  `sp_pid` int(10) NOT NULL,
  `sp_name` varchar(256) NOT NULL,
  `sp_price` decimal(10,2) NOT NULL,
  `sp_weight` decimal(10,3) NOT NULL,
  `sp_quantity` int(10) NOT NULL,
  `sp_discount` int(10) NOT NULL,
  `sp_status` tinyint(1) NOT NULL,
  `sp_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--

--
-- Table structure for table `temp_cart`
--

CREATE TABLE `temp_cart` (
  `cp_id` int(11) NOT NULL,
  `cp_pid` varchar(50) NOT NULL,
  `cp_poprice` varchar(100) NOT NULL,
  `cp_quantity` varchar(50) NOT NULL,
  `cp_discount` varchar(250) NOT NULL,
  `cp_total` varchar(100) NOT NULL,
  `cp_sessid` varchar(50) NOT NULL,
  `cp_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
  `cp_uid` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `terms_condition`
--

CREATE TABLE `terms_condition` (
  `t_id` int(11) NOT NULL,
  `t_content` mediumtext NOT NULL,
  `t_status` varchar(50) NOT NULL,
  `t_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `usercoupon_code`
--

CREATE TABLE `usercoupon_code` (
  `uc_id` int(11) NOT NULL,
  `uc_code` varchar(100) NOT NULL,
  `uc_nuid` varchar(50) NOT NULL,
  `uc_tdate` varchar(250) NOT NULL,
  `uc_amount` varchar(100) NOT NULL,
  `uc_status` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `v_id` int(250) NOT NULL,
  `v_name` varchar(250) NOT NULL,
  `v_email` varchar(250) NOT NULL,
  `v_pho` varchar(250) NOT NULL,
  `v_gst` varchar(250) NOT NULL,
  `v_address` varchar(250) NOT NULL,
  `v_cmpny` varchar(256) NOT NULL,
  `v_status` int(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `w_id` int(11) NOT NULL,
  `w_uid` varchar(50) NOT NULL,
  `w_pid` varchar(50) NOT NULL,
  `w_sessid` varchar(150) NOT NULL,
  `w_status` varchar(10) NOT NULL,
  `w_date` datetime NOT NULL DEFAULT '1970-01-01 00:00:01'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_deliveryboy`
--
ALTER TABLE `add_deliveryboy`
  ADD PRIMARY KEY (`db_id`);

--
-- Indexes for table `add_expences`
--
ALTER TABLE `add_expences`
  ADD PRIMARY KEY (`ex_id`);

--
-- Indexes for table `add_shade`
--
ALTER TABLE `add_shade`
  ADD PRIMARY KEY (`as_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `assign_order`
--
ALTER TABLE `assign_order`
  ADD PRIMARY KEY (`os_id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`bl_id`);

--
-- Indexes for table `booknow`
--
ALTER TABLE `booknow`
  ADD PRIMARY KEY (`bk_id`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`br_id`);

--
-- Indexes for table `cancellation`
--
ALTER TABLE `cancellation`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `cartdetails`
--
ALTER TABLE `cartdetails`
  ADD PRIMARY KEY (`cd_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`cit_id`);

--
-- Indexes for table `complain_suggest`
--
ALTER TABLE `complain_suggest`
  ADD PRIMARY KEY (`cs_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`ct_id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`cu_id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`cn_id`);

--
-- Indexes for table `coupon_code`
--
ALTER TABLE `coupon_code`
  ADD PRIMARY KEY (`cc_id`);

--
-- Indexes for table `create_page`
--
ALTER TABLE `create_page`
  ADD PRIMARY KEY (`pg_id`);

--
-- Indexes for table `delivery_status`
--
ALTER TABLE `delivery_status`
  ADD PRIMARY KEY (`dv_id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`dist_id`);

--
-- Indexes for table `exphead`
--
ALTER TABLE `exphead`
  ADD PRIMARY KEY (`exh_id`);

--
-- Indexes for table `feed_back`
--
ALTER TABLE `feed_back`
  ADD PRIMARY KEY (`f_id`);

--
-- Indexes for table `final_form`
--
ALTER TABLE `final_form`
  ADD PRIMARY KEY (`fi_id`);

--
-- Indexes for table `inchead`
--
ALTER TABLE `inchead`
  ADD PRIMARY KEY (`inh_id`);

--
-- Indexes for table `kyc`
--
ALTER TABLE `kyc`
  ADD PRIMARY KEY (`ky_id`),
  ADD UNIQUE KEY `ky_nuid` (`ky_nuid`);

--
-- Indexes for table `legal`
--
ALTER TABLE `legal`
  ADD PRIMARY KEY (`lg_id`);

--
-- Indexes for table `loc_details`
--
ALTER TABLE `loc_details`
  ADD PRIMARY KEY (`loc_id`);

--
-- Indexes for table `manage_appoint`
--
ALTER TABLE `manage_appoint`
  ADD PRIMARY KEY (`ma_id`);

--
-- Indexes for table `new_user`
--
ALTER TABLE `new_user`
  ADD PRIMARY KEY (`nu_id`),
  ADD UNIQUE KEY `nu_number` (`nu_number`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offer_amount`
--
ALTER TABLE `offer_amount`
  ADD PRIMARY KEY (`of_id`);

--
-- Indexes for table `offer_image`
--
ALTER TABLE `offer_image`
  ADD PRIMARY KEY (`of_id`);

--
-- Indexes for table `offer_img`
--
ALTER TABLE `offer_img`
  ADD PRIMARY KEY (`oi_id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `pincode`
--
ALTER TABLE `pincode`
  ADD PRIMARY KEY (`pn_id`);

--
-- Indexes for table `privacy_policy`
--
ALTER TABLE `privacy_policy`
  ADD PRIMARY KEY (`pp_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`p_id`),
  ADD UNIQUE KEY `p_name` (`p_name`);

--
-- Indexes for table `product_color`
--
ALTER TABLE `product_color`
  ADD PRIMARY KEY (`pclr_id`);

--
-- Indexes for table `product_features`
--
ALTER TABLE `product_features`
  ADD PRIMARY KEY (`pf_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`pm_id`);

--
-- Indexes for table `product_pincode`
--
ALTER TABLE `product_pincode`
  ADD PRIMARY KEY (`pp_id`);

--
-- Indexes for table `product_review`
--
ALTER TABLE `product_review`
  ADD PRIMARY KEY (`pr_id`);

--
-- Indexes for table `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`ps_id`);

--
-- Indexes for table `product_video`
--
ALTER TABLE `product_video`
  ADD PRIMARY KEY (`pv_id`);

--
-- Indexes for table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`pur_id`);

--
-- Indexes for table `pv_report`
--
ALTER TABLE `pv_report`
  ADD PRIMARY KEY (`pr_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rt_id`);

--
-- Indexes for table `return_policy`
--
ALTER TABLE `return_policy`
  ADD PRIMARY KEY (`rp_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`re_id`);

--
-- Indexes for table `review_image`
--
ALTER TABLE `review_image`
  ADD PRIMARY KEY (`ri_id`);

--
-- Indexes for table `seller_registration`
--
ALTER TABLE `seller_registration`
  ADD PRIMARY KEY (`sl_id`);

--
-- Indexes for table `seminar`
--
ALTER TABLE `seminar`
  ADD PRIMARY KEY (`sem_id`);

--
-- Indexes for table `shipping_details`
--
ALTER TABLE `shipping_details`
  ADD PRIMARY KEY (`spp_id`);

--
-- Indexes for table `slider_img`
--
ALTER TABLE `slider_img`
  ADD PRIMARY KEY (`img_id`);

--
-- Indexes for table `social_link`
--
ALTER TABLE `social_link`
  ADD PRIMARY KEY (`sl_id`);

--
-- Indexes for table `special_offer`
--
ALTER TABLE `special_offer`
  ADD PRIMARY KEY (`so_id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`st_id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`st_id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`scat_id`);

--
-- Indexes for table `sub_product`
--
ALTER TABLE `sub_product`
  ADD PRIMARY KEY (`sp_id`);

--
-- Indexes for table `temp_cart`
--
ALTER TABLE `temp_cart`
  ADD PRIMARY KEY (`cp_id`);

--
-- Indexes for table `terms_condition`
--
ALTER TABLE `terms_condition`
  ADD PRIMARY KEY (`t_id`);

--
-- Indexes for table `usercoupon_code`
--
ALTER TABLE `usercoupon_code`
  ADD PRIMARY KEY (`uc_id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`v_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`w_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_deliveryboy`
--
ALTER TABLE `add_deliveryboy`
  MODIFY `db_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `add_expences`
--
ALTER TABLE `add_expences`
  MODIFY `ex_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `add_shade`
--
ALTER TABLE `add_shade`
  MODIFY `as_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `assign_order`
--
ALTER TABLE `assign_order`
  MODIFY `os_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `bl_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `booknow`
--
ALTER TABLE `booknow`
  MODIFY `bk_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `br_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cancellation`
--
ALTER TABLE `cancellation`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cartdetails`
--
ALTER TABLE `cartdetails`
  MODIFY `cd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `cit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `complain_suggest`
--
ALTER TABLE `complain_suggest`
  MODIFY `cs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `ct_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `cu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `cn_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=240;

--
-- AUTO_INCREMENT for table `coupon_code`
--
ALTER TABLE `coupon_code`
  MODIFY `cc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `create_page`
--
ALTER TABLE `create_page`
  MODIFY `pg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `delivery_status`
--
ALTER TABLE `delivery_status`
  MODIFY `dv_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `dist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `exphead`
--
ALTER TABLE `exphead`
  MODIFY `exh_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feed_back`
--
ALTER TABLE `feed_back`
  MODIFY `f_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `final_form`
--
ALTER TABLE `final_form`
  MODIFY `fi_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `inchead`
--
ALTER TABLE `inchead`
  MODIFY `inh_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kyc`
--
ALTER TABLE `kyc`
  MODIFY `ky_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `legal`
--
ALTER TABLE `legal`
  MODIFY `lg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `loc_details`
--
ALTER TABLE `loc_details`
  MODIFY `loc_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `manage_appoint`
--
ALTER TABLE `manage_appoint`
  MODIFY `ma_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `new_user`
--
ALTER TABLE `new_user`
  MODIFY `nu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `offer_amount`
--
ALTER TABLE `offer_amount`
  MODIFY `of_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `offer_image`
--
ALTER TABLE `offer_image`
  MODIFY `of_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `offer_img`
--
ALTER TABLE `offer_img`
  MODIFY `oi_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pincode`
--
ALTER TABLE `pincode`
  MODIFY `pn_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `privacy_policy`
--
ALTER TABLE `privacy_policy`
  MODIFY `pp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `product_color`
--
ALTER TABLE `product_color`
  MODIFY `pclr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product_features`
--
ALTER TABLE `product_features`
  MODIFY `pf_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `pm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `product_pincode`
--
ALTER TABLE `product_pincode`
  MODIFY `pp_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_review`
--
ALTER TABLE `product_review`
  MODIFY `pr_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `product_size`
--
ALTER TABLE `product_size`
  MODIFY `ps_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_video`
--
ALTER TABLE `product_video`
  MODIFY `pv_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `pur_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pv_report`
--
ALTER TABLE `pv_report`
  MODIFY `pr_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `return_policy`
--
ALTER TABLE `return_policy`
  MODIFY `rp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `re_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `review_image`
--
ALTER TABLE `review_image`
  MODIFY `ri_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `seller_registration`
--
ALTER TABLE `seller_registration`
  MODIFY `sl_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seminar`
--
ALTER TABLE `seminar`
  MODIFY `sem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shipping_details`
--
ALTER TABLE `shipping_details`
  MODIFY `spp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `slider_img`
--
ALTER TABLE `slider_img`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `social_link`
--
ALTER TABLE `social_link`
  MODIFY `sl_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `special_offer`
--
ALTER TABLE `special_offer`
  MODIFY `so_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `st_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `st_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `scat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_product`
--
ALTER TABLE `sub_product`
  MODIFY `sp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `temp_cart`
--
ALTER TABLE `temp_cart`
  MODIFY `cp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `terms_condition`
--
ALTER TABLE `terms_condition`
  MODIFY `t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usercoupon_code`
--
ALTER TABLE `usercoupon_code`
  MODIFY `uc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `v_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `w_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- ============================================
-- Dummy Data from Application
-- ============================================

-- Categories
INSERT INTO `category` (`cat_id`, `cat_name`, `cat_seq`, `cat_image`, `cat_status`, `cat_date`) VALUES
(1, 'Necklaces', '1', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', '1', '2026-02-01 00:00:01'),
(2, 'Earrings', '2', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', '1', '2026-02-01 00:00:01'),
(3, 'Rings', '3', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400', '1', '2026-02-01 00:00:01'),
(4, 'Bracelets', '4', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400', '1', '2026-02-01 00:00:01'),
(5, 'Baptismal', '5', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', '1', '2026-02-01 00:00:01'),
(6, 'Altar Sets', '6', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400', '1', '2026-02-01 00:00:01'),
(7, 'Communion', '7', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', '1', '2026-02-01 00:00:01'),
(8, 'Censors', '8', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400', '1', '2026-02-01 00:00:01'),
(9, 'Candlesticks', '9', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400', '1', '2026-02-06 00:00:01');

-- Products
INSERT INTO `product` (`p_id`, `p_slid`, `p_catid`, `p_scatid`, `p_scname`, `p_name`, `p_code`, `p_price`, `p_discount`, `p_weight`, `p_description`, `p_date`, `p_status`) VALUES
(1, 'Admin', '1', '', '', 'Elegant Gold-Plated Necklace Set', 'SH-1001', '1256', '10', 0.000, 'Exquisite gold-plated necklace set perfect for weddings and special occasions', '2026-02-05 00:00:01', 1),
(2, 'Admin', '6', '', '', 'Traditional Silver Altar Set', 'AS-1001', '5000', '10', 0.000, 'Handcrafted silver altar set for religious ceremonies', '2026-02-05 00:00:01', 1),
(3, 'Admin', '8', '', '', 'Brass Censor with Chain', 'CE-100', '6500', '8', 0.000, 'Premium brass censor with decorative chain', '2026-02-05 00:00:01', 1),
(4, 'Admin', '9', '', '', 'Crystal Candlesticks Pair', 'CA-1001', '7000', '15', 0.000, 'Beautiful crystal candlesticks for home decor', '2026-02-06 00:00:01', 1),
(5, 'Admin', '7', '', '', 'First Communion Set', '22180', '9000', '5', 0.000, 'Beautiful communion set for your special day', '2026-02-05 00:00:01', 1),
(6, 'Admin', '5', '', '', 'Baptismal Shells - Premium', '22203', '2000', '2', 0.000, 'Elegant baptismal shells for sacred ceremonies', '2026-02-07 00:00:01', 1),
(7, 'Admin', '6', '', '', 'Designer Altar Table', 'AS-1002', '8596', '6', 0.000, 'Designer altar table with intricate carvings', '2026-02-05 00:00:01', 1),
(8, 'Admin', '8', '', '', 'Antique Brass Censor', 'CE-1001', '6500', '8', 0.000, 'Antique style brass censor with premium finish', '2026-02-05 00:00:01', 1);

-- Product Images
INSERT INTO `product_image` (`pm_id`, `pm_pid`, `pm_image`, `pm_status`) VALUES
(1, '1', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', '1'),
(2, '1', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600', '1'),
(3, '1', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600', '1'),
(4, '1', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', '1'),
(5, '2', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600', '1'),
(6, '3', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600', '1'),
(7, '4', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600', '1'),
(8, '5', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600', '1'),
(9, '6', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600', '1'),
(10, '7', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600', '1'),
(11, '8', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600', '1');

-- Blog Posts
INSERT INTO `blog` (`bl_id`, `bl_img`, `bl_title`, `bl_content`, `date`) VALUES
(1, 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200', 'The Art of Gold Plating: Everything You Need to Know', '<p>Gold plating is a technique where a thin layer of gold is applied to the surface of another metal, typically silver or copper. This process has been used for centuries to create beautiful, affordable jewelry that mimics the look of solid gold.</p><h2>Understanding Gold Plating</h2><p>The thickness of the gold layer is measured in microns. Generally, gold plating can range from 0.5 to 2.5 microns. The thicker the gold layer, the more durable and long-lasting the plating will be.</p><h2>Caring for Your Gold-Plated Jewelry</h2><p>To maintain the shine and longevity of your gold-plated pieces: Avoid exposure to water, perfume, and cosmetics. Store pieces separately to prevent scratching. Clean gently with a soft, dry cloth. Remove jewelry before sleeping or exercising. With proper care, your gold-plated jewelry can maintain its beautiful appearance for many years.</p>', '2026-04-05'),
(2, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200', 'Wedding Jewelry Trends for 2026', '<p>As we move into 2026, wedding jewelry trends are evolving to reflect both tradition and modernity. Brides are looking for pieces that not only complement their attire but also hold personal significance.</p><h2>Trending Styles</h2><p>This year''s top wedding jewelry trends include: Minimalist Diamonds: Delicate pieces with subtle sparkle. Vintage-inspired: Art deco and vintage Victorian designs. Colored Gemstones: Sapphires, emeralds, and rubies making a comeback. Pearls: Classic elegance with modern interpretations.</p><h2>Choosing the Right Piece</h2><p>When selecting wedding jewelry, consider your dress neckline, hairstyle, and personal style.</p>', '2026-03-28'),
(3, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200', 'How to Choose the Perfect Pendant for Your Neckline', '<p>Choosing the right pendant can transform your outfit and flatter your features. The key is to match the pendant length and style to your neckline.</p><h2>Neckline Guide</h2><ul><li><strong>High neck:</strong> Opt for longer pendants that sit below the neckline</li><li><strong>V-neck:</strong> Choose a pendant that follows the V shape</li><li><strong>Round neck:</strong> Pendants that hit at the collarbone work best</li><li><strong>Off-shoulder:</strong> Statement pieces work well with this style</li></ul><h2>Face Shape Considerations</h2><p>Your face shape also plays a role in pendant selection.</p>', '2026-03-15'),
(4, 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200', 'Understanding the Different Types of Altars', '<p>Altars hold significant cultural and religious importance across various traditions. Understanding the different styles can help you make an informed choice.</p><h2>Types of Altars</h2><ul><li><strong>Home Altars:</strong> Personal prayer spaces in residential settings</li><li><strong>Church Altars:</strong> Central fixtures in religious buildings</li><li><strong>Portable Altars:</strong> Mobile options for travel or small spaces</li><li><strong>Decorative Altars:</strong> Ornamental pieces for display</li></ul><h2>Choosing Materials</h2><p>Altars are commonly made from wood, metal, or stone.</p>', '2026-03-01'),
(5, 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200', 'Caring for Your Baptismal Jewelry', '<p>Baptismal jewelry holds deep spiritual significance and often becomes a treasured family heirloom. Proper care ensures these pieces remain beautiful for generations.</p><h2>Storage Tips</h2><ul><li>Store in a soft-lined jewelry box</li><li>Keep away from direct sunlight</li><li>Avoid exposure to moisture</li><li>Keep pieces separate to prevent tangling</li></ul><h2>Cleaning Guidelines</h2><p>Use gentle cleaning methods appropriate for the specific metal and gemstone.</p>', '2026-02-20'),
(6, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200', 'The Symbolism Behind Mangalsutra', '<p>The Mangalsutra is more than just a piece of jewelry; it''s a sacred symbol of marriage in Hindu tradition. Understanding its significance adds depth to its beauty.</p><h2>Historical Significance</h2><p>The word "Mangalsutra" combines "Mangal" (auspicious) and "Sutra" (thread), symbolizing the bond of marriage.</p><h2>Regional Variations</h2><p>Different regions have unique styles, from the classic black bead designs of South India to the elaborate diamond pendants of North India.</p><h2>Modern Interpretations</h2><p>Contemporary Mangalsutras blend traditional elements with modern aesthetics.</p>', '2026-02-10');

-- Reviews
INSERT INTO `review` (`re_id`, `re_pid`, `re_nuid`, `re_desc`, `re_title`, `re_name`, `re_image`, `re_status`, `re_date`) VALUES
(1, '1', '1', 'This necklace exceeded my expectations. The quality is amazing and it looks even better in person. Perfect for my sister''s wedding.', 'Absolutely Beautiful!', 'Priya S.', '', '1', '2026-03-15 00:00:01'),
(2, '1', '2', 'Beautiful design and good quality. The gold plating is holding up well after multiple uses.', 'Great Value for Money', 'Anita M.', '', '1', '2026-03-10 00:00:01');

-- Contact Information
INSERT INTO `contact` (`ct_id`, `ct_name`, `ct_phone`, `ct_email`, `ct_comment`, `ct_status`, `ct_date`) VALUES
(1, 'LUXEGEMS Customer Support', 9876543210, 'support@luxegems.in', 'Customer support contact', 1, '2026-02-01 00:00:01'),
(2, 'Sales Inquiry', 9876543211, 'sales@luxegems.in', 'Sales inquiry contact', 1, '2026-02-01 00:00:01');

-- Admin User
INSERT INTO `admin` (`a_id`, `a_email`, `a_password`, `a_vpwd`, `a_name`, `a_desig`, `a_phone`, `a_address`, `a_qual`, `a_photo`, `a_usertype`, `a_status`, `a_pagepermission`, `a_sms`, `a_date`) VALUES
(1, 'admin@luxegems.in', 'admin123', 'admin123', 'Administrator', 'Admin', '9876543210', 'Mumbai, Maharashtra', 'Manager', 'admin.jpg', '1', '1', 'all', '1', '2026-01-01 00:00:01'),
(2, 'manager@luxegems.in', 'manager123', 'manager123', 'Store Manager', 'Manager', '9876543211', 'Delhi NCR', 'Senior', 'manager.jpg', '2', '1', 'all', '1', '2026-01-15 00:00:01');

-- Social Links
INSERT INTO `social_link` (`sl_id`, `sl_flink`, `sl_tlink`, `sl_ylink`, `sl_ilink`, `sl_tglink`, `sl_tglink2`, `sl_tglink3`, `sl_status`, `sl_date`, `tds`, `del_charge`, `min_del`, `ruby`, `pearl`, `silver`, `gold`, `diamond`, `platinum`, `emerald`, `crown`) VALUES
(1, 'https://facebook.com/luxegems', 'https://twitter.com/luxegems', 'https://youtube.com/luxegems', 'https://instagram.com/luxegems', '', '', '', '1', '2026-01-01 00:00:01', 0, 50.00, 999, 10, 20, 30, 50, 100, 150, 200, 250);

-- Slider Images
INSERT INTO `slider_img` (`img_id`, `img_title`, `img_name`, `img_status`, `img_date`) VALUES
(1, 'Hero Banner - New Collection', 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920', '1', '2026-02-01 00:00:01'),
(2, 'Festive Sale', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1920', '1', '2026-02-15 00:00:01'),
(3, 'Wedding Collection', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920', '1', '2026-03-01 00:00:01');

-- Coupon Codes
INSERT INTO `coupon_code` (`cc_id`, `cc_fdate`, `cc_tdate`, `cc_code`, `cc_amount`, `cc_maxamount`, `cc_status`, `cc_cdate`) VALUES
(1, '2026-01-01', '2026-12-31', 'WELCOME10', '10', '500', '1', '2026-01-01'),
(2, '2026-04-01', '2026-04-30', 'FESTIVE20', '20', '1000', '1', '2026-04-01');

-- Return Policy
INSERT INTO `return_policy` (`rp_id`, `rp_content`, `rp_status`, `rp_date`) VALUES
(1, '<p>We offer a 7-day return policy for most items. Items must be in original condition with tags attached. Customized items cannot be returned.</p><p>To initiate a return, please contact our customer support team with your order details.</p>', '1', '2026-01-01 00:00:01');

-- Privacy Policy
INSERT INTO `privacy_policy` (`pp_id`, `pp_content`, `pp_status`, `pp_date`) VALUES
(1, '<p>At LUXEGEMS, we value your privacy. This policy explains how we collect, use, and protect your personal information.</p><p>We collect information you provide directly to us, including name, email, phone number, and shipping address. This information is used to process your orders and improve our services.</p>', '1', '2026-01-01 00:00:01');

-- Terms and Conditions
INSERT INTO `terms_condition` (`t_id`, `t_content`, `t_status`, `t_date`) VALUES
(1, '<p>Welcome to LUXEGEMS. By accessing our website and making purchases, you agree to our terms and conditions.</p><p>All products are subject to availability. We reserve the right to refuse service to anyone.</p><p>Prices are subject to change without notice.</p>', '1', '2026-01-01 00:00:01');

-- Legal
INSERT INTO `legal` (`lg_id`, `lg_title`, `lg_name`, `lg_status`, `lg_date`) VALUES
(1, 'Terms of Service', 'terms', 1, '2026-01-01 00:00:01'),
(2, 'Privacy Policy', 'privacy', 1, '2026-01-01 00:00:01'),
(3, 'Refund Policy', 'refund', 1, '2026-01-01 00:00:01');

-- Special Offers
INSERT INTO `special_offer` (`so_id`, `so_details`, `so_status`, `so_date`) VALUES
(1, 'Free shipping on orders above ₹999', 1, '2026-02-01 00:00:01'),
(2, '10% off on first order', 1, '2026-02-01 00:00:01'),
(3, 'Buy 2 Get 1 Free on selected items', 1, '2026-03-01 00:00:01');

-- Offer Images
INSERT INTO `offer_img` (`oi_id`, `oi_img`, `oi_status`) VALUES
(1, 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800', 1),
(2, 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800', 1),
(3, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', 1);

-- Create Page (CMS Pages)
INSERT INTO `create_page` (`pg_id`, `pg_name`, `pg_title`, `pg_desc`, `pg_status`) VALUES
(1, 'About Us', 'About LUXEGEMS', '<p>LUXEGEMS is a premium jewelry brand offering exquisite handcrafted pieces for every occasion.</p>', '1'),
(2, 'Contact', 'Contact Us', '<p>Get in touch with us for any inquiries.</p>', '1'),
(3, 'FAQ', 'Frequently Asked Questions', '<p>Find answers to common questions about our products and services.</p>', '1'),
(4, 'Shipping', 'Shipping Information', '<p>Learn about our shipping policies and delivery timelines.</p>', '1');
