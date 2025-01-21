<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('diet_plan_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('time_of_day', ['dorucak', 'rucak', 'vecera', 'uzina']);
            $table->decimal('calories', 10, 2);
            $table->decimal('proteins', 10, 2);
            $table->decimal('carbs', 10, 2);
            $table->decimal('fats', 10, 2);
            $table->timestamps();

            $table->foreign('diet_plan_id')->references('id')->on('diet_plans');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meals');
    }
};
