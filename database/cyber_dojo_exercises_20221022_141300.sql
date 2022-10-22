-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE TABLE "failed_jobs" ----------------------------------
CREATE TABLE `failed_jobs`( 
	`id` BigInt( 0 ) UNSIGNED AUTO_INCREMENT NOT NULL,
	`uuid` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`connection` Text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`queue` Text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`payload` LongText CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`exception` LongText CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`failed_at` Timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `failed_jobs_uuid_unique` UNIQUE( `uuid` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "frames" ---------------------------------------
CREATE TABLE `frames`( 
	`id` BigInt( 0 ) UNSIGNED AUTO_INCREMENT NOT NULL,
	`line_id` BigInt( 0 ) UNSIGNED NOT NULL,
	`frame_number` Int( 0 ) NOT NULL,
	`ball_1` Int( 0 ) NULL DEFAULT NULL,
	`ball_2` Int( 0 ) NULL DEFAULT NULL,
	`strike` TinyInt( 1 ) NOT NULL DEFAULT 0,
	`spare` TinyInt( 1 ) NOT NULL DEFAULT 0,
	`strike_caryover` Int( 0 ) NOT NULL DEFAULT 0,
	`spare_caryover` Int( 0 ) NOT NULL DEFAULT 0,
	`total` Int( 0 ) NULL DEFAULT NULL,
	`created_at` Timestamp NULL DEFAULT NULL,
	`updated_at` Timestamp NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "lines" ----------------------------------------
CREATE TABLE `lines`( 
	`id` BigInt( 0 ) UNSIGNED AUTO_INCREMENT NOT NULL,
	`user_id` BigInt( 0 ) UNSIGNED NOT NULL,
	`total_score` Int( 0 ) NULL DEFAULT NULL,
	`completed` TinyInt( 1 ) NOT NULL DEFAULT 0,
	`created_at` Timestamp NULL DEFAULT NULL,
	`updated_at` Timestamp NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "migrations" -----------------------------------
CREATE TABLE `migrations`( 
	`id` Int( 0 ) UNSIGNED AUTO_INCREMENT NOT NULL,
	`migration` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`batch` Int( 0 ) NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
ENGINE = InnoDB
AUTO_INCREMENT = 5;
-- -------------------------------------------------------------


-- CREATE TABLE "password_resets" ------------------------------
CREATE TABLE `password_resets`( 
	`email` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`token` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`created_at` Timestamp NULL DEFAULT NULL )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
ENGINE = InnoDB;
-- -------------------------------------------------------------


-- CREATE TABLE "users" ----------------------------------------
CREATE TABLE `users`( 
	`id` BigInt( 0 ) UNSIGNED AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`email` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`email_verified_at` Timestamp NULL DEFAULT NULL,
	`password` VarChar( 255 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`remember_token` VarChar( 100 ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
	`created_at` Timestamp NULL DEFAULT NULL,
	`updated_at` Timestamp NULL DEFAULT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `users_email_unique` UNIQUE( `email` ) )
CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
ENGINE = InnoDB
AUTO_INCREMENT = 2;
-- -------------------------------------------------------------


-- Dump data of "failed_jobs" ------------------------------
-- ---------------------------------------------------------


-- Dump data of "frames" -----------------------------------
-- ---------------------------------------------------------


-- Dump data of "lines" ------------------------------------
-- ---------------------------------------------------------


-- Dump data of "migrations" -------------------------------
BEGIN;

INSERT INTO `migrations`(`id`,`migration`,`batch`) VALUES 
( '1', '2014_10_12_000000_create_users_table', '1' ),
( '2', '2014_10_12_100000_create_password_resets_table', '1' ),
( '3', '2019_08_19_000000_create_failed_jobs_table', '1' ),
( '4', '2021_05_08_023146_create_lines_table', '1' ),
( '5', '2021_05_08_023203_create_frames_table', '1' );
COMMIT;
-- ---------------------------------------------------------


-- Dump data of "password_resets" --------------------------
-- ---------------------------------------------------------


-- Dump data of "users" ------------------------------------
BEGIN;

INSERT INTO `users`(`id`,`name`,`email`,`email_verified_at`,`password`,`remember_token`,`created_at`,`updated_at`) VALUES 
( '1', 'Admin', 'admin@admin.com', '2021-05-23 10:03:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SrVLIJAXdd', '2021-05-23 10:03:47', '2021-05-23 10:03:47' );
COMMIT;
-- ---------------------------------------------------------


-- CREATE INDEX "frames_line_id_foreign" -----------------------
CREATE INDEX `frames_line_id_foreign` USING BTREE ON `frames`( `line_id` );
-- -------------------------------------------------------------


-- CREATE INDEX "lines_user_id_foreign" ------------------------
CREATE INDEX `lines_user_id_foreign` USING BTREE ON `lines`( `user_id` );
-- -------------------------------------------------------------


-- CREATE INDEX "password_resets_email_index" ------------------
CREATE INDEX `password_resets_email_index` USING BTREE ON `password_resets`( `email` );
-- -------------------------------------------------------------


-- CREATE LINK "frames_line_id_foreign" ------------------------
ALTER TABLE `frames`
	ADD CONSTRAINT `frames_line_id_foreign` FOREIGN KEY ( `line_id` )
	REFERENCES `lines`( `id` )
	ON DELETE Cascade
	ON UPDATE No Action;
-- -------------------------------------------------------------


-- CREATE LINK "lines_user_id_foreign" -------------------------
ALTER TABLE `lines`
	ADD CONSTRAINT `lines_user_id_foreign` FOREIGN KEY ( `user_id` )
	REFERENCES `users`( `id` )
	ON DELETE Cascade
	ON UPDATE No Action;
-- -------------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


