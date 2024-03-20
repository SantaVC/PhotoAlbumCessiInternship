<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
      /*
     * Create a new controller instance.use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /*
     * Display the form to request a password reset link.
     *
     * @return \Illuminate\View\View
     */
    public function showLinkRequestForm()
    {
        return view('auth.passwords.email');
    }

    /*
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function sendResetLinkEmail(Request $request)
  {
    $this->validateEmail($request);

    $response = Password::broker()->sendResetLink(
        $request->only('email')
    );

    if ($response === Password::RESET_LINK_SENT) {
        return response()->json(['message' => 'Reset link sent successfully']);
    } else {
        return response()->json(['error' => 'Unable to send reset link'], 422);
    }
  }

    /*
     * Validate the email for the given request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);
    }

    /*
     * Get the response for a successful password reset link.
     *
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    protected function sendResetLinkResponse($response)
    {
        return response()->json(['message' => trans($response)]);
    }

    /*
     * Get the response for a failed password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response()->json(['error' => trans($response)], 422);
    }
}
