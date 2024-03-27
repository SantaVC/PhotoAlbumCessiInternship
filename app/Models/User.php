<?php
namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    // Определение fillable, hidden, casts и других свойств модели...

    public function hasValidToken($providedToken)
    {
        try {
            // Проверяем валидность токена
            $payload = JWTAuth::setToken($providedToken)->getPayload();

            // Получаем идентификатор пользователя из токена
            $userId = $payload['sub'];

            // Проверяем, что идентификатор пользователя в токене совпадает с идентификатором этого пользователя
            return $userId == $this->id;
        } catch (JWTException $e) {
            // Если возникает ошибка при обработке токена, считаем токен недействительным
            return false;
        }
    }
    /*
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nickname',
        'email',
        'password'
    ];

    /*
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /*
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Automatically hash the password when setting it.
     *
     * @param  string  $value
     * @return void
     */
    public function createUser(array $data)
    {
        return static::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'nickname' => $data['nickname'],
        ]);
    }
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
