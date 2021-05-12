<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFramesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('frames', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('line_id');

            $table->integer('frame_number');
            $table->integer('ball_1')->nullable();
            $table->integer('ball_2')->nullable();

            $table->boolean('strike')->default(false);
            $table->boolean('spare')->default(false);

            $table->integer('strike_caryover')->default(0);
            $table->integer('spare_caryover')->default(0);

            $table->integer('total')->nullable();

            $table->timestamps();

            // Can we do a unique check for frame_number and line_id: ToDo: Do this on the validation
            $table->foreign('line_id')->references('id')->on('lines')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('frames');
    }
}
