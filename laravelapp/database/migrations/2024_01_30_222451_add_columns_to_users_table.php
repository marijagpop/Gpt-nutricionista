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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('age')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->float('weight')->nullable();
            $table->float('height')->nullable();
            $table->enum('activity', ['sedentary', 'lightly_active', 'moderately_active', 'very_active'])->nullable();
            $table->text('dietary_restrictions')->nullable();
            $table->text('notes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('age');
            $table->dropColumn('gender');
            $table->dropColumn('weight');
            $table->dropColumn('height');
            $table->dropColumn('activity_level');
            $table->dropColumn('dietary_restrictions');
        });
    }
};
