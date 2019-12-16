/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : com_ongsat_facade

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-12-16 21:42:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_aliyun_oss
-- ----------------------------
DROP TABLE IF EXISTS `t_aliyun_oss`;
CREATE TABLE `t_aliyun_oss` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '主键',
  `domain_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '前缀域名',
  `endpoint` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `key_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `key_secret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `bucket_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `catalogue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '目录路径',
  `region` varchar(255) DEFAULT NULL COMMENT 'bucket所在的区域， 默认oss-cn-hangzhou'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='阿里云oss存储对象配置';

-- ----------------------------
-- Table structure for t_button_group
-- ----------------------------
DROP TABLE IF EXISTS `t_button_group`;
CREATE TABLE `t_button_group` (
  `id` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL COMMENT '按钮文本',
  `icon` varchar(255) DEFAULT NULL COMMENT '按钮图标 https://www.iviewui.com/components/icon',
  `open_url` text COMMENT '点击按钮跳转链接',
  `sort` int(255) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='主页面按钮组设置';

-- ----------------------------
-- Table structure for t_section
-- ----------------------------
DROP TABLE IF EXISTS `t_section`;
CREATE TABLE `t_section` (
  `id` varchar(250) NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '版块名称',
  `description` varchar(500) DEFAULT NULL COMMENT '版块描述',
  `show_status` int(2) DEFAULT NULL COMMENT '版块显示状态 1=显示 2=不显示',
  `open_url` text COMMENT '点击跳转链接',
  `sort` int(255) DEFAULT NULL COMMENT '排序',
  `on_status` int(2) DEFAULT NULL COMMENT '开启访问状态 1=开启访问 2=不开启访问，显示不开启访问的文本',
  `off_text` varchar(255) DEFAULT NULL COMMENT '不开启访问时显示的文本内容，比如可以填写，敬请期待',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='版块';

-- ----------------------------
-- Table structure for t_system_config
-- ----------------------------
DROP TABLE IF EXISTS `t_system_config`;
CREATE TABLE `t_system_config` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '网站标题',
  `description` varchar(255) DEFAULT NULL COMMENT '网站描述',
  `page_main_title` varchar(255) DEFAULT NULL,
  `page_main_description` varchar(255) DEFAULT NULL,
  `footer_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置';

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员用户表';
