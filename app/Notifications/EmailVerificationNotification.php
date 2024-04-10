<?php   

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class EmailVerificationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user;

    /**
     * Create a new notification instance.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        // Генерируем время истечения срока действия ссылки
        $expirationTimestamp = now()->addMinutes(5);

        // Создаем подписанную ссылку для подтверждения адреса электронной почты
        $url = URL::signedRoute('verify.email', ['expiration' => $expirationTimestamp]);

        return (new MailMessage)
            ->line('Пожалуйста, подтвердите ваш адрес электронной почты, перейдя по ссылке ниже:')
            ->action('Подтвердить адрес электронной почты', $url)
            ->line('Ссылка действительна в течение 24 часов.');
    }
}