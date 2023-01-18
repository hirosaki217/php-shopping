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
        Schema::create('products', function (Blueprint $table) {
            $table->string("product_id", 20)->primary();
            $table->string("product_name")->nullable(false);
            $table->string("product_image")->nullable(true)->default('');
            $table->decimal("product_price")->nullable(false)->default('0');
            $table->tinyInteger("is_sales")->nullable(false)->default('1');
            $table->text("description");;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
