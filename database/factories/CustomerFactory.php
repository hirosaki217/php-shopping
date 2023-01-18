<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'customer_name' => fake()->name,
            'email' => fake()->unique()->email,
            'address' => fake()->address(),
            'tel_num' => strval(fake()->unique()->numerify('##########')),
            'is_active' => fake()->boolean(),
        ];
    }
}
