<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;
use Validator;
use Response;
use Illuminate\Support\Facades\Input;

class IndexController extends Controller
{
    public function addItem(Request $request)
    {
        $rules = array(
                'name' => 'required|unique:ds,name',
                'freight' => 'required|numeric'
        );
        $validator = Validator::make(Input::all(), $rules);
        if ($validator->fails()) {
            return Response::json(array(

                    'errors' => $validator->getMessageBag()->toArray(),
            ));
        } else {
            $data = new Data();
            $data->name = $request->name;
            $data->freight = $request->freight;
            $data->save();

            return response()->json($data);
        }
    }
    public function readItems(Request $req)
    {
        $data = Data::all();

        return view('welcome')->withData($data);
    }
    public function editItem(Request $request)
    {
      $data = Data::find($request->id);
      if ($request->name != $data->name) {
        $rules = array(
                'name' => 'required|unique:ds,name',
                'freight' => 'required|numeric'
        );
      }else {
        $rules = array(                        
                'freight' => 'required|numeric'
        );
      }

      $validator = Validator::make(Input::all(), $rules);
      if ($validator->fails()) {
          return Response::json(array(

                  'errors' => $validator->getMessageBag()->toArray(),
          ));
      } else {

        $data->name = $request->name;
        $data->freight = $request->freight;
        $data->save();

        return response()->json($data);
      }
    }
    public function deleteItem(Request $req)
    {
        Data::find($req->id)->delete();

        return response()->json();
    }
}
