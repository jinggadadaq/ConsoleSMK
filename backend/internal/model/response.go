package model

import "time"

// standard response format requested
type Response struct {
	Sukses bool        `json:"sukses"`
	Pesan  string      `json:"pesan"`
	Data   interface{} `json:"data"`
	Meta   *Meta       `json:"meta,omitempty"`
}

type Meta struct {
	Halaman int `json:"halaman"`
	Total   int `json:"total"`
}

func Success(message string, data interface{}) Response {
	return Response{
		Sukses: true,
		Pesan:  message,
		Data:   data,
	}
}

func SuccessWithMeta(message string, data interface{}, meta Meta) Response {
	return Response{
		Sukses: true,
		Pesan:  message,
		Data:   data,
		Meta:   &meta,
	}
}

func Error(message string) Response {
	return Response{
		Sukses: false,
		Pesan:  message,
		Data:   nil,
	}
}
