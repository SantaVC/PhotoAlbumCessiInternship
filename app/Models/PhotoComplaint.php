<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PhotoComplaint extends Model
{
    protected $fillable = ['user_id', 'photo_id', 'reason', 'complainer_id'];

    public function photo()
    {
        return $this->belongsTo(Photo::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function complainer()
    {
        return $this->belongsTo(User::class, 'complainer_id');
    }
}
