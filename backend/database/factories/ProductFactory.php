<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $users = User::where('role', 'seller')->pluck('id')->toArray();
        return [
            'name' => $this->faker->name(),
            'cost' => $this->faker->randomDigit(),
            'available' => $this->faker->randomDigit(),
            'seller_id' => $this->faker->randomElement($users)
        ];
    }
}
